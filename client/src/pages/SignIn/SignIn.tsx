import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Container, Paper, Stack, Typography, Box, Alert } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { emailValidation, passwordValidation } from 'shared/validations'
import logo from 'assets/images/logo/white-transparent-logo.svg'

import s from './Styles.module.scss'

function SignIn() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(),
  })

  return (
    <Box className={s.backgroundImg}>
      <Container
        maxWidth="lg"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <img src={logo} className={s.logo} />

        <Box>
          <Paper
            elevation={16}
            sx={{
              minWidth: '550px',
              display: 'flex',
              flexDirection: 'column',
              p: 3,
            }}
          >
            <Box mb={3}>
              <Typography variant="h5">{t('actions.signIn')}</Typography>
              <Typography color="text.secondary" variant="body2">
                {t('user:dontHaveAccount')}
                <Button color="primary">{t('actions.register')}</Button>
              </Typography>
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                authorization.signIn(values)
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Stack justifyContent="center" spacing={2}>
                    <InputField field="email" label="user:email" />
                    <InputField field="password" label="user:password" type="password" />
                    <Button color="primary" variant="contained" type="submit">
                      {t('actions.signIn')}
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
            <Button color="primary" sx={{ mt: 1 }}>
              {t('actions.forgotPassword')}
            </Button>
          </Paper>

          <Alert severity="error" sx={{ mt: 2.5 }}>
            You can use <strong>admin@gmail.com</strong> and password <strong>qwerqwer</strong>!
          </Alert>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(SignIn)
