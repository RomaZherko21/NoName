import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Container } from '@mui/material'

import { PageHeader, Tabs } from 'shared/ui'
import { ROUTES } from 'shared/consts'

import { Billing, General, Notifications, Security, Team } from './ui'

function Account() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="lg">
      <PageHeader pageName={t('page:account')} breadcrumbs={[{ text: 'page:account' }]} />
      <Tabs
        options={[
          { label: 'General', to: ROUTES.ACCOUNT_GENERAL, Component: General },
          { label: 'Billing', to: ROUTES.ACCOUNT_BILLING, Component: Billing },
          { label: 'Team', to: ROUTES.ACCOUNT_TEAM, Component: Team },
          { label: 'Notifications', to: ROUTES.ACCOUNT_NOTIFICATIONS, Component: Notifications },
          { label: 'Security', to: ROUTES.ACCOUNT_SECURITY, Component: Security },
        ]}
      />
    </Container>
  )
}

export default observer(Account)
