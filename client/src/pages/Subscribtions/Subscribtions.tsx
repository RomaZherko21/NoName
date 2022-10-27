import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { CommonTable, Spinner } from 'shared/ui'

import { SubscribtionsModel, getColumns } from './model'

function Subscribtions() {
  const { t } = useTranslation()

  useEffect(() => {
    SubscribtionsModel.fetch()
  }, [])

  const columns = useMemo(() => getColumns(), [])

  return (
    <>
      <Helmet>
        <title>{t('page:subscribtions')}</title>
        <meta name="description" content={t('page:subscribtions')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:subscribtions')}
          </Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container direction="column">
        <Grid item>
          {SubscribtionsModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={SubscribtionsModel.subscribtions} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Subscribtions)
