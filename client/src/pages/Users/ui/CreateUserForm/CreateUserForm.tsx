import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useMemo } from 'react'
import { Formik, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  commonStringValidation,
} from 'shared/validations'
import { User, Roles, Gender } from 'shared/types'
import { GENDER, ROLES } from 'shared/consts'

import { UsersModel } from '../../model'
import styles from './Styles.module.scss'
import { InputField, SelectField } from 'shared/ui'

function CreateUserForm({ hideModal }: any) {
  const { t } = useTranslation()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: commonStringValidation('Name', 3),
        surname: commonStringValidation('Surname', 3),
        email: emailValidation(),
        role: commonStringValidation('Role'),
        date_of_birth: commonStringValidation('date_of_birth', 10),
        password: passwordValidation(),
        confirmPassword: confirmPasswordValidation(),
      }),
    []
  )

  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } = useFormik<User>({
    initialValues: {
      name: '',
      surname: '',
      middle_name: '',
      email: '',
      tel_number: '',
      role: Roles.user,
      gender: Gender.man,
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (value: User) => {
      UsersModel.create(value)
      hideModal()
    },
  })

  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        middle_name: '',
        email: '',
        tel_number: '',
        role: Roles.user,
        gender: Gender.man,
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(value: User) => {
        UsersModel.create(value)
        hideModal()
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

export default observer(CreateUserForm)
