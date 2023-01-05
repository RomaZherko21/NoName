import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Grid, Button } from '@mui/material'

import {
  AsideFilters,
  AsideFiltersBar,
  CommonTable,
  PageHeader,
  Pagination,
  Spinner,
} from 'shared/ui'
import { ROUTES } from 'shared/consts'

import { BooksFilters, BooksModel, getColumns, getFiltersConfig } from './model'

function Books() {
  const { t } = useTranslation()

  const [openFilter, setOpenFilter] = useState(false)
  const navigate = useNavigate()

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  const [filters, setFilters] = useState<BooksFilters>({})

  useEffect(() => {
    BooksModel.fetch()
  }, [])

  const columns = useMemo(() => getColumns(), [])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  return (
    <>
      <PageHeader pageName={t('page:books')}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate(ROUTES.BOOK_NEW)}>
            {t('book:actions.addBook')}
          </Button>
        </Grid>
      </PageHeader>

      <Grid spacing={2} container direction="column">
        <Grid item>
          <AsideFiltersBar
            filters={filters}
            setFilters={setFilters}
            handleOpenFilter={handleOpenFilter}
          />
        </Grid>

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

      <AsideFilters
        config={filtersConfig}
        filters={filters}
        setFilters={setFilters}
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
      />
    </>
  )
}

export default observer(Books)
