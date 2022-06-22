import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
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
import { UserMeta } from 'shared/types'
import { ROLES } from 'shared/consts'

import UsersModel from '../Users.model'
import styles from './Styles.module.scss'

const validationSchema = yup.object().shape({
  name: commonStringValidation('Name', 3),
  surname: commonStringValidation('Surname', 3),
  email: emailValidation(),
  password: passwordValidation(),
  confirmPassword: confirmPasswordValidation(),
})

const UpdateUserForm = ({ user, hideModal }: any) => {
  const { name, surname, email, role } = user

  const { t } = useTranslation()

  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } =
    useFormik<UserMeta>({
      initialValues: {
        name,
        surname,
        email,
        role,
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: (value: UserMeta) => {
        UsersModel.update(value)
        hideModal()
      },
    })

  return (
    <form onSubmit={handleSubmit} className={styles.centered}>
      <Grid item container spacing={2} direction="column">
        <Grid item>
          <TextField
            fullWidth
            id="name"
            name="name"
            label={t('user:name')}
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="surname"
            name="surname"
            label={t('user:surname')}
            value={values.surname}
            onChange={handleChange}
            error={touched.surname && Boolean(errors.surname)}
            helperText={touched.surname && errors.surname}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="email"
            name="email"
            label={t('user:email')}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="role">{t('user:role')}</InputLabel>
            <Select
              labelId="role"
              id="role"
              value={values.role}
              label="role"
              onChange={(e) => setFieldValue('role', e.target.value)}
            >
              {Object.values(ROLES).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {touched.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="password"
            name="password"
            label={t('user:password')}
            type="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label={t('user:confirmPassword')}
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {t('common.confirm')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(UpdateUserForm)
