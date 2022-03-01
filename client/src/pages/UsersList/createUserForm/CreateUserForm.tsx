import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Button,
  FormControl,
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
} from 'validations'
import { UserMeta } from 'types/user'
import { roles, ROLES } from 'constants/index'

import UsersModel from '../Users.model'
import styles from './Styles.module.scss'

const validationSchema = yup.object().shape({
  name: commonStringValidation('Name', 3),
  surname: commonStringValidation('Surname', 3),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})

const CreateUserForm = ({ hideModal }: any) => {
  const { handleSubmit, values, handleChange, touched, errors, setFieldValue } =
    useFormik<UserMeta>({
      initialValues: {
        name: '',
        surname: '',
        email: '',
        role: 'admin',
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: (val: UserMeta) => {
        UsersModel.create({ ...val, role_id: ROLES[val.role] })
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
            label="Name"
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
            label="Surname"
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
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              value={values.role}
              label="role"
              onChange={(e) => setFieldValue('role', e.target.value)}
            >
              {Object.keys(roles).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
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
            label="Confirm password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(CreateUserForm)
