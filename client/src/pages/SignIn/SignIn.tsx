import * as yup from 'yup'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'

import { useRootStore } from 'stores'
import { emailValidation, passwordValidation } from 'shared/validations'

const validationSchema = yup.object().shape({
  email: emailValidation(),
  password: passwordValidation(),
})

function SignIn() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const formik = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: { email: string; password: string }) => {
      authorization.signIn(values)
    },
  })

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>Logo</Avatar>
        <Typography component="h1" variant="h5">
          {t('translation:actions.signIn')}
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Stack justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
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
            <Button color="primary" variant="contained" type="submit">
              {t('translation:common.confirm')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default observer(SignIn)
