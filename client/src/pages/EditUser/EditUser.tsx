import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Grid, Paper, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { GENDER, NODE_API_USER_AVATAR_URL, ROLES, ROUTES } from 'shared/consts'
import { InformativeImage, InputField, SelectField, Spinner } from 'shared/ui'
import { getInitials } from 'shared/helpers'
import { Gender, Roles } from 'shared/types'
import {
  commonStringValidation,
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from 'shared/validations'

import styles from './Styles.module.scss'
import { EditUserModel } from './model'

function EditUser() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    EditUserModel.fetchUser(Number(id))
  }, [])

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t(`user:name`), 3),
        surname: commonStringValidation(t(`user:surname`), 3),
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
      <Button
        onClick={() => navigate(ROUTES.USERS)}
        sx={{ color: (theme) => theme.palette.text.primary, mb: 3 }}
        startIcon={<ArrowBackIcon fontSize="large" />}
        size="large"
      >
        <Typography variant="h6">{t('page:users')}</Typography>
      </Button>

      {EditUserModel.loading.has ? (
        <Spinner />
      ) : (
        <>
          <InformativeImage
            imgUrl={`${NODE_API_USER_AVATAR_URL}/${EditUserModel.avatar}`}
            imgPlaceholder={getInitials(`${EditUserModel.name} ${EditUserModel.surname}`)}
            PrimaryText={EditUserModel.email}
            size="large"
            PrimaryTextVariant="h4"
            SecondaryText={`user_id: ${Number(id)}`}
            SecondaryTextVariant="subtitle1"
          />

          <Formik
            initialValues={{
              name: EditUserModel?.name || '',
              surname: EditUserModel?.surname || '',
              middle_name: EditUserModel?.middle_name || '',
              email: EditUserModel?.email || '',
              tel_number: EditUserModel?.tel_number || '',
              role: EditUserModel?.role || Roles.user,
              gender: EditUserModel?.gender || Gender.man,
              date_of_birth: EditUserModel?.date_of_birth || '1999-04-21',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              EditUserModel.updateUser(values, Number(id))
              navigate(ROUTES.USERS)
              toast.success(t('notification:success.updated'))
            }}
          >
            {({ handleSubmit }) => (
              <Paper sx={{ mt: 4 }}>
                <form onSubmit={handleSubmit} className={styles.centered}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">{t('user:actions.editUser')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="name" label="user:name" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="surname" label="user:surname" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="middle_name" label="user:middleName" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="tel_number" label="user:telephoneNumber" />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectField field="gender" label="user:gender" options={GENDER} />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="email" label="user:email" />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectField field="role" label="user:role" options={ROLES} />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="date_of_birth" label="user:dateOfBirth" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="password" label="user:password" type="password" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField
                        field="confirmPassword"
                        label="user:confirmPassword"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ color: (theme) => theme.palette.divider }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                        {t('actions.update')}
                      </Button>
                      <Button onClick={() => navigate(ROUTES.USERS)} color="inherit">
                        {t('actions.cancel')}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            )}
          </Formik>
        </>
      )}
    </>
  )
}

export default observer(EditUser)
