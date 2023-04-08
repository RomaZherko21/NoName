import { Formik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { InputField } from 'shared/ui'
import { useState } from 'react'

function ContactForm() {
  const { t } = useTranslation()

  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const size = ['1-10', '11-30', '31-50']

  const team = [t('contact:actions.engineering'), t('contact:actions.design')]

  const prise = ['$20,000+', '$50,000+']

  return (
    <Formik
      initialValues={{
        postTitle: '',
        shortDescription: '',
        genre: '',
        description: '',
        readingTime: '',
        cover: null
      }}
      onSubmit={(values) => {}}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid
              component={Paper}
              container
              elevation={1}
              sx={{ display: 'flex', flexDirection: 'column', p: 5, gap: 5 }}
            >
              <Grid item md={4}>
                <Typography variant="h6">{t('contact:fillTheForm')}</Typography>
              </Grid>
              <Grid item md={10} sx={{ display: 'flex', gap: 4 }}>
                <InputField field="fullName" label="contact:fullName" />
                <InputField field="companyName" label="contact:companyName" />
              </Grid>
              <Grid item md={10} sx={{ display: 'flex', gap: 4 }}>
                <InputField field="workEmail " label="contact:workEmail" />
                <InputField field="phoneNumber" label="contact:phoneNumber" />
              </Grid>
              <Grid item md={10} sx={{ display: 'flex', gap: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('contact:companySize')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="contact:companySize "
                    onChange={handleChange}
                  >
                    {size.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('contact:actions.team')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="contact:actions.team"
                    onChange={handleChange}
                  >
                    {team.map((team) => (
                      <MenuItem key={team} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={10} sx={{ display: 'flex', gap: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t('contact:projectBudget')}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="contact:projectBudget"
                    onChange={handleChange}
                  >
                    {prise.map((prise) => (
                      <MenuItem key={prise} value={prise}>
                        {prise}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={10} sx={{ display: 'flex', gap: 4 }}>
                <TextField
                  sx={{ width: '100%' }}
                  id="outlined-multiline-static"
                  label={t('contact:message')}
                  multiline
                  rows={6}
                />
              </Grid>
              <Button size="large" type="submit" variant="contained" sx={{ width: '83%' }}>
                {t('contact:send')}
              </Button>
              <Grid item md={4} sx={{ minWidth: '100%' }}>
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
