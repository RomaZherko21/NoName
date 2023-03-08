import { useMemo } from 'react'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Button, Grid, Paper, Stack, Typography, Box } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField, SelectField, UploadImageField } from 'shared/ui'
import { commonStringValidation, emailValidation } from 'shared/validations'
import { getFullName } from 'shared/helpers'
import { GENDER, API_USER_AVATAR_URL, ROLES } from 'shared/consts'
import { DeleteAccount } from 'entities'

const General = () => {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t('user:name'), 3),
        surname: commonStringValidation(t('user:surname'), 3),
        email: emailValidation(),
        role: commonStringValidation(t('user:role')),
        date_of_birth: commonStringValidation(t('user:dateOfBirth'), 10),
      }),
    [t]
  )

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
          surname: user.surname,
          middle_name: user.middle_name,
          full_name: getFullName(user.name, user.surname, user.middle_name),
          email: user.email,
          tel_number: user.tel_number,
          role: user.role,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          user.update(values)
          toast.success(t('notification:success.updated'))
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid component={Paper} sx={{ p: 4, width: '100%', mb: 2 }} container>
              <Grid xs={12} md={4}>
                <Typography variant="h6">{t('user:basicDetails')}</Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack sx={{ mb: 3, width: 'fit-content' }}>
                  <UploadImageField
                    imageUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
                    field="avatar"
                    imgSx={{ width: 80, height: 80 }}
                  />
                </Stack>

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
              <Grid item lg={4} md={6} xs={12}>
                <Typography color="textPrimary" variant="h6">
                  {t('common.confirm')}
                </Typography>
              </Grid>

              <Grid item lg={8} md={6} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography color="textPrimary" variant="body1">
                    {t('sentences:confirm')}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, width: 'fit-content' }}
                  >
                    {t('common.confirm')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <DeleteAccount onDelete={user.remove} />
    </>
  )
}

export default observer(General)
