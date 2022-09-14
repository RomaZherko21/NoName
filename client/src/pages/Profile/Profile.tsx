import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { ProfileInfo } from './ui/ProfileInfo'
import { ProfileForm } from './ui/ProfileForm'
import { Helmet } from 'react-helmet'

function Profile() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('pages:profile')}</title>
        <meta name="description" content={t('pages:profile')} />
      </Helmet>

      <Grid container>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('pages:profile')}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileForm />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Profile)
