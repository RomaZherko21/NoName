import * as yup from 'yup'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import { InputField } from 'shared/ui'
import { FormSelect } from 'shared/ui/Form'
import {
  commonStringValidation,
  emailValidation,
  fullNameValidation,
  phoneNumberValidation
} from 'shared/validations'

function ContactForm() {
  const { t } = useTranslation()

  const validationSchemaContact = yup.object().shape({
    fullName: fullNameValidation(),
    companyName: commonStringValidation('Company name'),
    email: emailValidation(),
    phoneNumber: phoneNumberValidation('contact:phoneNumber'),
    companySize: yup.mixed().required('Required'),
    team: yup.mixed().required('Required'),
    projectBudget: yup.mixed().required('Required'),
    message: commonStringValidation('Message')
  })

  return (
    <Formik
      initialValues={{
        fullName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        companySize: '',
        team: '',
        projectBudget: '',
        message: ''
      }}
      validationSchema={validationSchemaContact}
      onSubmit={(values) => {
        console.log('onSubmit', values)
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid
              component={Paper}
              container
              elevation={1}
              sx={{ display: 'flex', flexDirection: 'column', p: 4, gap: 5 }}
            >
              <Grid item md={4}>
                <Typography variant="h6">{t('contact:fillTheForm')}</Typography>
              </Grid>

              <Grid item md={12} sx={{ display: 'flex', gap: 4 }}>
                <InputField field="fullName" label="contact:fullName" />
                <InputField field="companyName" label="contact:companyName" />
              </Grid>

              <Grid item md={12} sx={{ display: 'flex', gap: 4 }}>
                <InputField field="email" label="contact:workEmail" />
                <InputField field="phoneNumber" label="contact:phoneNumber" />
              </Grid>

              <Grid item md={12} sx={{ display: 'flex', gap: 4 }}>
                <FormSelect
                  field="companySize"
                  label="contact:companySize"
                  options={{ '1-10': '1-10', '10-20': '10-20' }}
                />

                <FormSelect
                  field="team"
                  label="contact:actions.team"
                  options={{
                    engineering: t('contact:actions.engineering'),
                    design: t('contact:actions.design')
                  }}
                />
              </Grid>

              <Grid item md={12} sx={{ display: 'flex', gap: 4 }}>
                <FormSelect
                  field="projectBudget"
                  label="contact:projectBudget"
                  options={{ '20': '$20,000+', '50': '$50,000+' }}
                />
              </Grid>

              <Grid item md={12} sx={{ display: 'flex', gap: 4 }}>
                <InputField field="message" label="contact:message" multiline rows={6} />
              </Grid>

              <Button size="large" type="submit" variant="contained">
                {t('contact:send')}
              </Button>

              <Grid item md={12} sx={{ minWidth: '100%' }}>
                <Typography variant="body2">{t('contact:privacyPolicy')}</Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default ContactForm
