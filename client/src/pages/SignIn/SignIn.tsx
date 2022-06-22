import * as yup from 'yup'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Grid, TextField } from '@mui/material'

import { emailValidation, passwordValidation } from 'shared/validations'
import { useRootStore } from 'stores'
import { User } from 'shared/types'

import styles from './Styles.module.scss'

const validationSchema = yup.object().shape({
  email: emailValidation(),
  password: passwordValidation(),
})

const SignIn = () => {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const formik = useFormik<User>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: User) => {
      authorization.signIn(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.centered}>
      <Grid item container spacing={2} direction="column" xs={11} md={6}>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            {t('common.confirm')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default observer(SignIn)
