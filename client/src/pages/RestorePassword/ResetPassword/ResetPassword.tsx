import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Container, Paper, Stack, Typography, Box, Link as MuiLink } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { confirmPasswordValidation, emailValidation, passwordValidation } from 'shared/validations'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'
import { ROUTES } from 'shared/consts'

import s from './Styles.module.scss'

function ResetPassword() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(),
    confirmPassword: confirmPasswordValidation()
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
          <Button
            variant="text"
            sx={{ mb: 2, color: ({ palette }) => `${palette.grey[100]}` }}
            startIcon={<ArrowBackIcon />}
          >
            <MuiLink component={Link} to={ROUTES.SIGN_IN}>
              {t('actions.goBack')}
            </MuiLink>
            {/* <Link href={ROUTES.SIGN_IN} color="inherit" underline="hover">
              {t('actions.goBack')}
            </Link> */}
          </Button>
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
              <Typography variant="h5">{t('actions.resetPassword')}</Typography>
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                authorization.signIn(values)
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Stack justifyContent="center" spacing={2}>
                    <InputField field="password" label="user:password" type="password" />
                    <InputField
                      type="password"
                      field="confirmPassword"
                      label="user:confirmPassword"
                    />
                    <Button color="primary" variant="contained" type="submit">
                      {t('actions.reset')}
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(ResetPassword)
