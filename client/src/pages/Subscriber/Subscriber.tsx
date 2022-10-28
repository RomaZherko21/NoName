import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

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
      <Helmet>
        <title>{t('page:subscriber')}</title>
        <meta name="description" content={t('page:subscriber')} />
      </Helmet>

      <Grid container>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:subscriber')}
          </Typography>
        </Grid>
      </Grid>

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
