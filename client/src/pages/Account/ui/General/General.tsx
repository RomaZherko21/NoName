import { Grid, Paper, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { DeleteAccount } from './DeleteAccount'
import { ProfileForm } from './ProfileForm'

const General = () => {
  const { t } = useTranslation()

  return (
    <>
      <Grid container spacing={1}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5">{t('user:basicDetails')}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileForm />
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs={12}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(General)
