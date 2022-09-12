import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { CommonTable, Pagination, Spinner } from 'shared/ui'

import { CryptoModel } from './model'
import { getColumns } from './model/columns'

function CryptoList() {
  const { t } = useTranslation()

  useEffect(() => {
    CryptoModel.fetch()
  }, [])

  const columns = useMemo(() => getColumns(), [getColumns])

  return (
    <>
      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h5">{t('pages:cryptoList')}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} direction="column" style={{ marginTop: '12px' }}>
        <Grid item container spacing={0.5}></Grid>
        <Grid item>
          <Pagination paginationModel={CryptoModel.pagination} />
        </Grid>
        <Grid item>
          {CryptoModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={CryptoModel.items} columns={columns} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default observer(CryptoList)
