import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Container, Grid } from '@mui/material'

import { PageHeader, Tabs } from 'shared/ui'

import { General, Notifications, Security, Team } from './ui'

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
          { label: 'Team', Component: Team },
          { label: 'Notifications', Component: Notifications },
          { label: 'Security', Component: Security },
        ]}
      />

      <Grid container spacing={3}>
        {/* <Grid item lg={8} md={6} xs={12}>
          <ProfileList />
        </Grid> */}

        <Grid item lg={4} xs={12}></Grid>
      </Grid>
    </Container>
  )
}

export default observer(Account)
