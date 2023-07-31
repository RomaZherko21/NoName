import * as yup from 'yup'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Typography, Box } from '@mui/material'

import { InputField } from 'shared/ui'
import { confirmPasswordValidation, passwordValidation } from 'shared/validations'
import { AuthWrapper } from '../../../entities/AuthWrapper/index'

function ResetPassword() {
  const { t } = useTranslation()

  const validationSchema = yup.object().shape({
    password: passwordValidation(),
    confirmPassword: confirmPasswordValidation()
  })

  return (
    <AuthWrapper>
      <Box mb={3}>
        <Typography variant="h5">{t('actions.resetPassword')}</Typography>
      </Box>
      <Formik
        initialValues={{
          // email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack justifyContent="center" spacing={2}>
              <InputField field="password" label="user:password" type="password" />
              <InputField type="password" field="confirmPassword" label="user:confirmPassword" />
              <Button color="primary" variant="contained" type="submit">
                {t('actions.reset')}
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </AuthWrapper>
  )
}

export default observer(ResetPassword)
