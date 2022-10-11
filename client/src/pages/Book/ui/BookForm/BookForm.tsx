import { useMemo } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { useRootStore } from 'stores'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { InputField, SelectField } from 'shared/ui'
import { Formik } from 'formik'
import { commonStringValidation, emailValidation } from 'shared/validations'

import styles from './Styles.module.scss'
import { GENDER, ROLES } from 'shared/consts'

const BookForm = () => {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(`user:name`, 3),
        surname: commonStringValidation(`user:surname`, 3),
        email: emailValidation(),
        role: commonStringValidation(`user:role`),
        date_of_birth: commonStringValidation(`user:dateOfBirth`, 10),
      }),
    []
  )

  return (
    <Card>
      <CardHeader subheader={t('sentence:profileSubheader')} title={t('common.profile')} />
      <Divider />
      <CardContent>
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
            <form onSubmit={handleSubmit} className={styles.centered}>
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
      </CardContent>
    </Card>
  )
}

export default BookForm
