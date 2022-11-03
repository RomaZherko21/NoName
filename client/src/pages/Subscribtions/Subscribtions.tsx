import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { CommonTable, PageHeader, Spinner } from 'shared/ui'

import { SubscribtionsModel, getColumns } from './model'

function Subscribtions() {
  const { t } = useTranslation()

  useEffect(() => {
    SubscribtionsModel.fetch()
  }, [])

  const columns = useMemo(() => getColumns(), [])

  return (
    <>
      <PageHeader pageName={t('page:subscribtions')} />

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
