import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { PageHeader } from 'widgets'
import { Tabs } from 'shared/ui'
import { ROUTES } from 'shared/consts'

import { Billing, General, Notifications, Security, Team, Verification } from './ui'

function Account() {
  const { t } = useTranslation()
  const location = useLocation()

  const breadcrumbs = useMemo(() => {
    return [{ text: 'page:account' }, { text: `page:${location.pathname.split('/').at(-1)}` }]
  }, [location])

  return (
    <>
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
          { label: 'page:verification', to: ROUTES.ACCOUNT_VERIFICATION, Component: Verification },
        ]}
      />
    </>
  )
}

export default observer(Account)
