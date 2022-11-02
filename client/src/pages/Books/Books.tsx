import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { CommonTable, Pagination, Spinner } from 'shared/ui'

import { BooksModel, getColumns } from './model'

function Books() {
  const { t } = useTranslation()

  useEffect(() => {
    BooksModel.fetch()
  }, [])

  const columns = useMemo(() => getColumns(), [])

  return (
    <>
      <Helmet>
        <title>{t('page:books')}</title>
        <meta name="description" content={t('page:books')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:books')}
          </Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container direction="column">
        <Grid item>
          {BooksModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={BooksModel.books} columns={columns} />
          )}
        </Grid>
        <Grid item>
          <Pagination paginationModel={BooksModel.pagination} />
        </Grid>
      </Grid>
    </>
  )
}

export default observer(Books)
