import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { PageHeader } from 'shared/ui'

import { Subscriptions, SubscriberInfo } from './ui'
import { SubscriberModel } from './model'

function Subscriber() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    if (Number(id)) {
      SubscriberModel.fetch(Number(id))
    }
  }, [id])

  return (
    <>
      <PageHeader pageName={t('page:subscriber')} />

      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <SubscriberInfo />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <Subscriptions />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Subscriber)
