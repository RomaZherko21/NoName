import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Grid } from '@mui/material'

import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  commonStringValidation,
} from 'shared/validations'
import { User, Roles, Gender } from 'shared/types'
import { GENDER, ROLES } from 'shared/consts'

import styles from './Styles.module.scss'
import { InputField, SelectField } from 'shared/ui'

function UserForm({ onSubmit, user }: { onSubmit: (value: User) => void; user?: User }) {
  const { t } = useTranslation()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation(`user:name`, 3),
        surname: commonStringValidation(`user:surname`, 3),
        email: emailValidation(),
        role: commonStringValidation(`user:role`),
        date_of_birth: commonStringValidation(`user:dateOfBirth`, 10),
        password: passwordValidation(),
        confirmPassword: confirmPasswordValidation(),
      }),
    []
  )

  return (
    <Formik
      initialValues={{
        name: user?.name || '',
        surname: user?.surname || '',
        middle_name: user?.middle_name || '',
        email: user?.email || '',
        tel_number: user?.tel_number || '',
        role: user?.role || Roles.user,
        gender: user?.gender || Gender.man,
        date_of_birth: user?.date_of_birth || '1999-04-21',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
              <InputField field="password" label="user:password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <InputField field="confirmPassword" label="user:confirmPassword" type="password" />
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
  )
}

export default observer(UserForm)
