import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography, Box, Link as MuiLink } from '@mui/material'

import { useRootStore } from 'stores'
import { InputField } from 'shared/ui'
import { emailValidation, passwordValidation } from 'shared/validations'
import { ROUTES } from 'shared/consts'

import AuthWrapper from './ui/AuthWrapper'

function SignIn() {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const validationSchema = yup.object().shape({
    email: emailValidation(),
    password: passwordValidation()
  })

  return (
    <AuthWrapper>
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
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minWidth: 550,
          pt: 2
        }}
        color="text.secondary"
        variant="body2"
      >
        <MuiLink component={Link} to={ROUTES.FORGOT_PASSWORD}>
          {t('actions.forgotPassword')}
        </MuiLink>
      </Typography>
    </AuthWrapper>
  )
}

export default observer(SignIn)
