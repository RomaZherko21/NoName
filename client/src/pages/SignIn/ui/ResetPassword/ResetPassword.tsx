import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Container, Paper, Stack, Typography, Box, Alert } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { emailValidation, passwordValidation } from 'shared/validations'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import s from '../../Styles.module.scss'

function SignIn() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation(),
    password: passwordValidation()
  })

  return (
    <Box
      sx={{
        background: ({ palette }) =>
          `linear-gradient(45deg, ${palette.background.default} 30%, rgba(37, 69, 125, 1) 80%, rgba(3, 175, 213, 1) 100%)`
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 15
        }}
      >
        <img src={logo} className={s.logo} alt="Logo" />

        <Box>
          <Paper
            elevation={16}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 550,
              p: 3
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
                password: ''
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
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minWidth: 550,
                p: 0
              }}
            >
              <Button color="primary" sx={{ mt: 1, mr: 1 }}>
                {t('actions.forgotPassword')}
              </Button>
              <Button color="primary" sx={{ mt: 1 }}>
                {t('actions.resetPassword')}
              </Button>
            </Paper>
          </Paper>

          <Alert severity="error" sx={{ mt: 2.5 }}>
            You can use <strong>&quot;admin@gmail.com&quot;</strong> and password{' '}
            <strong>&quot;qwerqwer&quot;</strong>
          </Alert>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(SignIn)
