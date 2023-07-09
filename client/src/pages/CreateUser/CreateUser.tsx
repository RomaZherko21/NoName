import { useMemo } from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Button, Grid, Paper, Typography } from '@mui/material'

import { Gender, Roles } from 'shared/types'
import { getSplitName, normalizePhone } from 'shared/helpers'
import { GENDER, MAX_IMAGE_SIZE, ROLES, ROUTES, SUPPORTED_IMAGE_FORMATS } from 'shared/consts'
import {
  FormDatePicker,
  InputField,
  FormPhoneNumber,
  SelectField,
  Spinner,
  UploadImageField
} from 'shared/ui'
import {
  commonStringValidation,
  confirmPasswordValidation,
  emailValidation,
  fileValidation,
  fullNameValidation,
  phoneNumberValidation,
  passwordValidation,
  required
} from 'shared/validations'

import { CreateUserModel } from './model'
import { PageHeader } from 'widgets'

function CreateUser() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        full_name: fullNameValidation(),
        email: emailValidation(),
        role: commonStringValidation(t('user:role')),
        tel_number: phoneNumberValidation(t('fields.phone')),
        date_of_birth: required(t('user:dateOfBirth')),
        password: passwordValidation(),
        confirmPassword: confirmPasswordValidation(),
        avatar: fileValidation({
          field: 'avatar',
          maxSize: MAX_IMAGE_SIZE,
          fileFormats: SUPPORTED_IMAGE_FORMATS
        })
      }),
    [t]
  )

  return (
    <>
      <PageHeader
        pageName={t('page:createUser')}
        breadcrumbs={[{ text: 'page:users' }, { text: 'page:sub.create' }]}
      />
      <Formik
        initialValues={{
          full_name: '',
          email: '',
          tel_number: '',
          role: Roles.user,
          gender: Gender.man,
          date_of_birth: null,
          password: '',
          confirmPassword: '',
          avatar: null
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          CreateUserModel.create(
            {
              ...getSplitName(values.full_name),
              email: values.email,
              tel_number: normalizePhone(values.tel_number),
              role: values.role,
              gender: values.gender,
              date_of_birth: values.date_of_birth ?? '',
              avatar: values.avatar ?? '',
              password: values.password,
              confirmPassword: values.confirmPassword
            },
            () => {
              navigate(ROUTES.USERS)
              toast.success(t('notification:success.created'))
            }
          )
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {CreateUserModel.loading.has ? (
              <Spinner />
            ) : (
              <>
                <Grid component={Paper} sx={{ p: 4, width: '100%', mb: 2 }} elevation={4} container>
                  <Grid xs={12} md={4}>
                    <Typography variant="h6">{t('user:basicDetails')}</Typography>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <UploadImageField field="avatar" />

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <InputField field="full_name" label="user:fullName" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormPhoneNumber label="fields.phone" field="tel_number" />
                      </Grid>
                      <Grid item xs={12}>
                        {/* !!!!!!!!!!!!!!                   */}
                        <InputField
                          type="email"
                          field="email"
                          label="user:email"
                          // sx={{ background: (theme: any) => theme.palette.secondary.dark }}
                          // sx={{ background: (theme: any) => theme.palette.secondary.dark }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid component={Paper} elevation={4} sx={{ p: 4, width: '100%', mb: 2 }} container>
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
                      <FormDatePicker field="date_of_birth" label="user:dateOfBirth" />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid component={Paper} elevation={4} sx={{ p: 4, width: '100%', mb: 2 }} container>
                  <Grid xs={12} md={4}>
                    <Typography variant="h6">{t('user:security')}</Typography>
                  </Grid>

                  <Grid container spacing={3} xs={12} md={8}>
                    <Grid item md={12} xs={12}>
                      <InputField type="password" field="password" label="user:password" />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputField
                        type="password"
                        field="confirmPassword"
                        label="user:confirmPassword"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  component={Paper}
                  elevation={4}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 2,
                    p: 2
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
