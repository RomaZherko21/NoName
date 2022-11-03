import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { ProfileInfo, ProfileForm, DeleteAccount } from './ui'
import { PageHeader } from 'shared/ui'
import { ProfileList } from 'pages/Profile/ui/ProfileList'

function Account() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader pageName={t('page:account')} />

      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileForm />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileList />
        </Grid>

        <Grid item lg={4} xs={12}></Grid>
        <Grid item lg={8} xs={12}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Account)
