import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, Typography } from '@mui/material'

import { CommonTable, Spinner } from 'shared/ui'
import { useDialog } from 'shared/hooks'
import { Subscriber } from 'shared/types'

import { SubscriberForm } from './ui'
import { SubscribersModel, getColumns } from './model'

function Subscribers() {
  const { t } = useTranslation()

  useEffect(() => {
    SubscribersModel.fetch()
  }, [])

  const [showCreateUserModal] = useDialog('book:form.addSubscriber', (hideModal) => (
    <SubscriberForm
      onSubmit={(value: Subscriber) => {
        SubscribersModel.create(value)
        hideModal()
      }}
    />
  ))

  const columns = useMemo(() => getColumns(), [])

  return (
    <>
      <Helmet>
        <title>{t('page:subscribers')}</title>
        <meta name="description" content={t('page:subscribers')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:subscribers')}
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ m: 1 }}>
            <Button variant="contained" color="primary" onClick={showCreateUserModal}>
              {t('book:actions.addSubscriber')}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid spacing={2} container direction="column">
        <Grid item>
          {SubscribersModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={SubscribersModel.subscribers} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Subscribers)
