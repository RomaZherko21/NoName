import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Container } from '@mui/material'

import { PageHeader, Tabs } from 'shared/ui'
import { ROUTES } from 'shared/consts'

import { Billing, General, Notifications, Security, Team } from './ui'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

function Account() {
  const { t } = useTranslation()
  const location = useLocation()

  const breadcrumbs = useMemo(() => {
    return [{ text: 'page:account' }, { text: `page:${location.pathname.split('/').at(-1)}` }]
  }, [location])

  return (
    <Container maxWidth="lg">
      <PageHeader pageName={t('page:account')} breadcrumbs={breadcrumbs} />
      <Tabs
        options={[
          { label: 'page:general', to: ROUTES.ACCOUNT_GENERAL, Component: General },
          { label: 'page:billing', to: ROUTES.ACCOUNT_BILLING, Component: Billing },
          { label: 'page:team', to: ROUTES.ACCOUNT_TEAM, Component: Team },
          {
            label: 'page:notifications',
            to: ROUTES.ACCOUNT_NOTIFICATIONS,
            Component: Notifications,
          },
          { label: 'page:security', to: ROUTES.ACCOUNT_SECURITY, Component: Security },
        ]}
      />
    </Container>
  )
}

export default observer(Account)
