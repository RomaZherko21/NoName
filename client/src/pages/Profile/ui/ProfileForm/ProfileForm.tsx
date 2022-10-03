import { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material'
import { useRootStore } from 'stores'
import { useTranslation } from 'react-i18next'
import { API } from 'services'

const states = [
  {
    value: 'alabama',
    label: 'Alabama',
  },
  {
    value: 'new-york',
    label: 'New York',
  },
  {
    value: 'san-francisco',
    label: 'San Francisco',
  },
]

const ProfileForm = (props: any) => {
  const { user } = useRootStore()
  const { t } = useTranslation()

  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
  })

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader={t('sentence:profileSubheader')} title={t('common.profile')} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="surname"
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              API.user.selfUpdate(values)
            }}
          >
            {t('actions:save')}
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default ProfileForm
