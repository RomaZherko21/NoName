import { useMemo } from 'react'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { Button, Divider, Grid, Paper, Stack, Typography, Card, CardContent, Box } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField, SelectField, Spinner, UploadImage } from 'shared/ui'
import { commonStringValidation, emailValidation } from 'shared/validations'
import { getFullName } from 'shared/helpers'
import { GENDER, ROLES } from 'shared/consts'

const ProfileForm = () => {
  const { t } = useTranslation()
  const { user, loading } = useRootStore()

  const handleUploadClick = async (event: any) => {
    await user.uploadPhoto(event.target.files[0])
  }

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(t(`user:name`), 3),
        surname: commonStringValidation(t(`user:surname`), 3),
        email: emailValidation(),
        role: commonStringValidation(t(`user:role`)),
        date_of_birth: commonStringValidation(t(`user:dateOfBirth`), 10),
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
            <Paper sx={{ p: 4, width: '100%', mb: 1 }}>
              <Grid container spacing={1}>
                <Grid xs={12} md={4}>
                  <Typography variant="h6">{t('user:basicDetails')}</Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack sx={{ mb: 3, width: 'fit-content' }}>
                    {loading.has ? (
                      <Spinner />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{borderStyle: 'dashed', borderWidth: 1, borderRadius: '50%', p: 0.5}}>
                          <UploadImage
                            width={80}
                            height={80}
                            handleUploadClick={handleUploadClick}
                            imageUrl={user.getPhotoUrl()}
                          />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Button variant="text" size='small' sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            {t('actions.change')}
                          </Button>
                        </Box>
                      </Box>
                    )}
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
            </Paper>

            <Paper sx={{ p: 4, width: '100%', mb: 1 }}>
              <Grid container spacing={1}>
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
            </Paper>

            <Card>
              <CardContent>
                <Grid container spacing={3}>
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
              </CardContent>
            </Card>
          </form>
        )}
      </Formik>
    </>
  )
}

export default observer(ProfileForm)
