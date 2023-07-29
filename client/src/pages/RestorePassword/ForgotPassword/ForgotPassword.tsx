import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Typography, Box, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

import { ROUTES } from 'shared/consts'
import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { emailValidation } from 'shared/validations'
import { AuthWrapper } from 'pages/SignIn'

function ForgotPassword() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation()
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 550
      }}
    >
      <AuthWrapper>
        <Box>
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
                  <Button color="primary" variant="contained">
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
        </Box>
      </AuthWrapper>
    </Box>
  )
}

export default observer(ForgotPassword)
