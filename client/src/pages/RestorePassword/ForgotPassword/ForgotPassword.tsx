import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Link as MuiLink,
  Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ROUTES } from 'shared/consts'
import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { emailValidation } from 'shared/validations'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import s from './Styles.module.scss'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation()
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
            sx={{
              mb: 2,
              color: ({ palette }) => `${palette.grey[100]}`
            }}
            startIcon={<ArrowBackIcon />}
          >
            <MuiLink component={Link} to={ROUTES.SIGN_IN}>
              {t('actions.goBack')}
            </MuiLink>
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
              <Typography variant="h5">{t('actions.forgotPassword')}</Typography>
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
                    <Button color="primary" variant="contained" type="submit">
                      <MuiLink
                        component={Link}
                        to={ROUTES.RESET_PASSWORD}
                        underline="none"
                        color="inherit"
                      >
                        {t('actions.sendResetLink')}
                      </MuiLink>
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
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

export default observer(ForgotPassword)
