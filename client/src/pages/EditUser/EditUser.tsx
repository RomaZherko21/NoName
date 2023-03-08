import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Grid, Paper, Divider, Chip, Box, Switch } from '@mui/material'

import { GENDER, API_USER_AVATAR_URL, ROLES, ROUTES } from 'shared/consts'
import {
  InformativeImage,
  InputField,
  FormPhoneNumber,
  SelectField,
  Spinner,
  FormDatePicker,
} from 'shared/ui'
import { getFullName, getInitials, getSplitName, normalizePhone } from 'shared/helpers'
import { Gender, Roles } from 'shared/types'
import {
  commonStringValidation,
  confirmPasswordValidation,
  emailValidation,
  fullNameValidation,
  phoneNumberValidation,
  passwordValidation,
  required,
} from 'shared/validations'

import { EditUserModel } from './model'
import s from './Styles.module.scss'
import { PageHeader } from 'widgets'

function EditUser() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    EditUserModel.fetchUser(Number(id))
  }, [id])

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
      }),
    [t]
  )
  return (
    <>
      <PageHeader
        pageName={t('page:editUser')}
        breadcrumbs={[{ text: 'page:users' }, { text: 'page:sub.edit' }]}
      />

      {EditUserModel.loading.has ? (
        <Spinner />
      ) : (
        <>
          <InformativeImage
            imgUrl={`${API_USER_AVATAR_URL}/${EditUserModel.avatar}`}
            imgPlaceholder={getInitials(`${EditUserModel.name} ${EditUserModel.surname}`)}
            PrimaryText={EditUserModel.email}
            size="large"
            PrimaryVariant="h4"
            SecondaryText={
              <Typography variant="subtitle2" color={'text.primary'}>
                user_id:{' '}
                <Chip
                  label={Number(id)}
                  size="small"
                  sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
                />
              </Typography>
            }
          />

          <Formik
            initialValues={{
              full_name:
                getFullName(EditUserModel.name, EditUserModel.surname, EditUserModel.middle_name) ||
                '',
              email: EditUserModel?.email || '',
              tel_number: EditUserModel?.tel_number ?? '',
              role: EditUserModel?.role || Roles.user,
              gender: EditUserModel?.gender ?? Gender.man,
              date_of_birth: EditUserModel?.date_of_birth ?? '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              EditUserModel.updateUser(
                {
                  ...getSplitName(values.full_name),
                  email: values.email,
                  tel_number: normalizePhone(values.tel_number),
                  role: values.role,
                  gender: values.gender,
                  date_of_birth: values.date_of_birth,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                },
                Number(id)
              )
              navigate(ROUTES.USERS)
              toast.success(t('notification:success.updated'))
            }}
          >
            {({ handleSubmit }) => (
              <Paper sx={{ mt: 4 }}>
                <form onSubmit={handleSubmit} className={s.centered}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">{t('page:editUser')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputField field="full_name" label="user:fullName" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormPhoneNumber label="fields.phone" field="tel_number" />
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
                      <FormDatePicker field="date_of_birth" label="user:dateOfBirth" />
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
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="h6" mb={1}>
                          Make Contact Info Public
                        </Typography>
                        <Typography color={'text.secondary'} variant="body2">
                          Means that anyone viewing your profile will be able to see your contacts
                          details
                        </Typography>
                      </Box>
                      <Switch />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ color: (theme) => theme.palette.divider }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                        {t('actions.update')}
                      </Button>
                      <Button to={ROUTES.USERS} component={Link} color="inherit">
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
