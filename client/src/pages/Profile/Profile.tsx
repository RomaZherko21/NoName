import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { ProfileInfo, ProfileForm, DeleteAccount } from './ui'

function Profile() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('page:profile')}</title>
        <meta name="description" content={t('page:profile')} />
      </Helmet>

      <Grid container>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:profile')}
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

        <Grid item lg={4} md={6} xs={12}></Grid>
        <Grid item lg={8} md={8} xs={12}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Profile)
