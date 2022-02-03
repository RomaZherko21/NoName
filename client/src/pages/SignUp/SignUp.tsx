import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, Grid, TextField } from '@mui/material'

import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from 'validations'
import { useRootStore } from 'stores/Root'

import styles from './Styles.module.scss'
import { FormTypes } from './types'

const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})

const SignUp = () => {
  const { authorization } = useRootStore()

  const formik = useFormik<FormTypes>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values: FormTypes) => {
      authorization.signUp(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.centered}>
      <Grid container spacing={2} direction="column" xs={12} md={6}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(SignUp)
