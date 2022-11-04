import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Container, Grid, Paper, Typography } from '@mui/material'

import { ProfileForm, DeleteAccount, ProfileList, General } from './ui'
import { PageHeader, Tabs } from 'shared/ui'

function Kek() {
  return <>KEKEKFE</>
}

function Account() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="lg">
      <PageHeader pageName={t('page:account')} />

      <Tabs
        options={[
          { label: 'General', Component: General },
          { label: 'Billing', Component: Kek },
          { label: 'Team', Component: Kek },
          { label: 'Notifications', Component: Kek },
          { label: 'Security', Component: Kek },
        ]}
      />

      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileList />
        </Grid>

        <Grid item lg={4} xs={12}></Grid>
        <Grid item lg={8} xs={12}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </Container>
  )
}

export default observer(Account)
