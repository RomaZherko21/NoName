import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from 'shared/consts'
import { InputField } from 'shared/ui'
import { emailValidation } from 'shared/validations'
import { AuthWrapper } from '../../../entities/AuthWrapper/index'

function ForgotPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()

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
            onSubmit={() => {
              navigate(ROUTES.RESET_PASSWORD)
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Stack justifyContent="center" spacing={2}>
                  <InputField type="email" field="email" label="user:email" />
                  <Button type="submit" color="primary" variant="contained">
                    <Typography>{t('actions.sendResetLink')}</Typography>
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
