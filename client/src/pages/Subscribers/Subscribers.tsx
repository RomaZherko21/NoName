import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid } from '@mui/material'

import { AsideFilters, AsideFiltersBar, CommonTable, PageHeader, Spinner } from 'shared/ui'
import { useDialog } from 'shared/hooks'
import { Subscriber } from 'shared/types'

import { SubscriberForm } from './ui'
import { SubscribersModel, getColumns, SubscriberFilters, getFiltersConfig } from './model'

function Subscribers() {
  const { t } = useTranslation()

  const [openFilter, setOpenFilter] = useState(false)

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  const [filters, setFilters] = useState<SubscriberFilters>({})

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
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  return (
    <>
      <PageHeader pageName={t('page:subscribers')}>
        <Grid item>
          <Box sx={{ m: 1 }}>
            <Button variant="contained" color="primary" onClick={showCreateUserModal}>
              {t('book:actions.addSubscriber')}
            </Button>
          </Box>
        </Grid>
      </PageHeader>

      <Grid spacing={2} container direction="column">
        <Grid item>
          <AsideFiltersBar
            filters={filters}
            onChange={(e: any) => setFilters((pre: any) => ({ ...pre, email: e.target.value }))}
            handleOpenFilter={handleOpenFilter}
            placeholder="user:actions.searchEmail"
            name="email"
          />
        </Grid>
        <Grid item>
          {SubscribersModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={SubscribersModel.subscribers} columns={columns} />
          )}
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

export default observer(Subscribers)
