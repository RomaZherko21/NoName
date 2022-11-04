import * as yup from 'yup'
import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Stack } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField, SelectField, Spinner, UploadImage } from 'shared/ui'
import { commonStringValidation, emailValidation } from 'shared/validations'
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
      <Stack sx={{ mb: 2, width: 'fit-content' }}>
        {loading.has ? (
          <Spinner />
        ) : (
          <UploadImage
            width={64}
            height={64}
            handleUploadClick={handleUploadClick}
            imageUrl={user.getPhotoUrl()}
          />
        )}
      </Stack>
      <Divider />
      <Formik
        initialValues={{
          name: user.name,
          surname: user.surname,
          middle_name: user.middle_name,
          email: user.email,
          tel_number: user.tel_number,
          role: user.role,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          user.selfUpdate(values)
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <InputField field="name" label="user:name" />
              </Grid>
              <Grid item md={4} xs={12}>
                <InputField field="surname" label="user:surname" />
              </Grid>
              <Grid item md={4} xs={12}>
                <InputField field="middle_name" label="user:middleName" />
              </Grid>
              <Grid item md={8} xs={12}>
                <InputField field="tel_number" label="user:telephoneNumber" />
              </Grid>
              <Grid item md={4} xs={12}>
                <SelectField field="gender" label="user:gender" options={GENDER} />
              </Grid>
              <Grid item md={8} xs={12}>
                <InputField field="email" label="user:email" />
              </Grid>
              <Grid item md={4} xs={12}>
                <SelectField field="role" label="user:role" options={ROLES} />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputField field="date_of_birth" label="user:dateOfBirth" />
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  {t('common.confirm')}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default observer(ProfileForm)
