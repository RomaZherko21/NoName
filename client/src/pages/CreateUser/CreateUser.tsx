import { useMemo } from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Button, Grid, Paper, Typography } from '@mui/material'

import { Gender, Roles } from 'shared/types'
import { getSplitName } from 'shared/helpers'
import { GENDER, ROLES, ROUTES } from 'shared/consts'
import { InputField, SelectField, Spinner } from 'shared/ui'
import {
  commonStringValidation,
  confirmPasswordValidation,
  emailValidation,
  fullNameValidation,
  passwordValidation,
} from 'shared/validations'

import { UserAvatar } from './ui'
import { CreateUserModel } from './model'

function CreateUser() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        full_name: fullNameValidation(),
        email: emailValidation(),
        role: commonStringValidation(t(`user:role`)),
        date_of_birth: commonStringValidation(t(`user:dateOfBirth`), 10),
        password: passwordValidation(),
        confirmPassword: confirmPasswordValidation(),
      }),
    [t]
  )

  return (
    <>
      <Formik
        initialValues={{
          full_name: '',
          email: '',
          tel_number: '',
          role: Roles.user,
          gender: Gender.man,
          date_of_birth: '',
          password: '',
          confirmPassword: '',
          avatar: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          CreateUserModel.fetch({
            ...getSplitName(values.full_name),
            email: values.email,
            tel_number: values.tel_number,
            role: values.role,
            gender: values.gender,
            date_of_birth: values.date_of_birth,
            password: values.password,
            confirmPassword: values.confirmPassword,
            avatar: values.avatar,
          })
          navigate(ROUTES.USERS)
          toast.success(t('notification:success.created'))
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {CreateUserModel.loading.has ? (
              <Spinner />
            ) : (
              <>
                <Grid component={Paper} sx={{ p: 4, width: '100%', mb: 2 }} container>
                  <Grid xs={12} md={4}>
                    <Typography variant="h6">{t('user:basicDetails')}</Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <UserAvatar />

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <InputField field="full_name" label="user:fullName" />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField field="tel_number" label="user:telephoneNumber" />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField field="email" label="user:email" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid component={Paper} sx={{ p: 4, width: '100%', mb: 2 }} container>
                  <Grid xs={12} md={4}>
                    <Typography variant="h6">{t('user:meta')}</Typography>
                  </Grid>

                  <Grid container spacing={3} xs={12} md={8}>
                    <Grid item md={6} xs={12}>
                      <SelectField field="gender" label="user:gender" options={GENDER} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <SelectField field="role" label="user:role" options={ROLES} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputField field="date_of_birth" label="user:dateOfBirth" />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid component={Paper} sx={{ p: 4, width: '100%', mb: 2 }} container>
                  <Grid xs={12} md={4}>
                    <Typography variant="h6">{t('user:security')}</Typography>
                  </Grid>

                  <Grid container spacing={3} xs={12} md={8}>
                    <Grid item md={12} xs={12}>
                      <InputField field="password" label="user:password" />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputField field="confirmPassword" label="user:confirmPassword" />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  component={Paper}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 2,
                    p: 2,
                  }}
                  container
                >
                  <Button component={Link} to={ROUTES.USERS} color="inherit">
                    {t('user:actions.cancel')}
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    {t('common.confirm')}
                  </Button>
                </Grid>
              </>
            )}
          </form>
        )}
      </Formik>
    </>
  )
}

export default observer(CreateUser)
