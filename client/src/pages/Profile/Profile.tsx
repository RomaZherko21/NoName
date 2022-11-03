import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { ProfileInfo, ProfileForm, DeleteAccount } from './ui'
import { PageHeader } from 'shared/ui'

function Profile() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader pageName={t('page:profile')} />

      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileForm />
        </Grid>

        <Grid item lg={4} xs={12}></Grid>
        <Grid item lg={8} xs={12}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Profile)
