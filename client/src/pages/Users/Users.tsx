import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { Box, Button, Grid, Paper, TableContainer } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { AsideFilters, AsideFiltersBar, CommonTable, Pagination, Spinner } from 'shared/ui'
import { PageHeader } from 'widgets'
import { useDialog } from 'shared/hooks'
import { getSearchParamsObj } from 'shared/helpers'
import { User } from 'shared/types'

import { UserForm } from './ui'
import { UsersModel, getFiltersConfig, getColumns, sortConfig } from './model'

function Users() {
  const { t } = useTranslation()
  const [openFilter, setOpenFilter] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const columns = useMemo(() => getColumns(), [])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])
  const sortOptions = useMemo(() => sortConfig, [])

  useEffect(() => {
    UsersModel.debounceFetch({ searchParams: getSearchParamsObj(searchParams) })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersModel.pagination.currentPage, UsersModel.pagination.limit, searchParams])

  const [showCreateUserModal] = useDialog('user:form.createNewUser', (hideModal) => (
    <UserForm
      onSubmit={(value: User) => {
        UsersModel.create(value)
        hideModal()
        toast.success(t('notification:success.created'))
      }}
    />
  ))

  return (
    <>
      <PageHeader
        pageName={t('page:users')}
        breadcrumbs={[{ text: 'page:users' }, { text: 'page:sub.create' }]}
      >
        <Grid item>
          <Box sx={{ m: 1 }}>
            <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              {t('common.import')}
            </Button>
            <Button startIcon={<FileDownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              {t('common.export')}
            </Button>
            <Button variant="contained" color="primary" onClick={showCreateUserModal}>
              {t('user:form.createNewUser')}
            </Button>
          </Box>
        </Grid>
      </PageHeader>

      <Grid container direction="column">
        <AsideFiltersBar
          inputValue={searchParams.get('name') || ''}
          onInputChange={(e: any) => {
            searchParams.set('name', e.target.value)
            setSearchParams(searchParams)
          }}
          handleOpenFilter={() => {
            setOpenFilter(true)
          }}
          inputPlaceholder="post:actions.searchName"
          selectValue={`${searchParams.get('order_by')} ${searchParams.get('order_type')}` || ''}
          onSelectChange={(e: any) => {
            const [field, orderType] = e.target.value.split(' ')

            searchParams.set('order_by', field)
            searchParams.set('order_type', orderType)

            setSearchParams(searchParams)
          }}
          sortOptions={sortOptions}
          isTablePart
        />
        <Grid item>
          {UsersModel.loading.has ? (
            <Spinner />
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: '0 0 20px 20px' }}>
              <CommonTable data={UsersModel.users} columns={columns} />
              <Pagination paginationModel={UsersModel.pagination} />
            </TableContainer>
          )}
        </Grid>
      </Grid>

      <AsideFilters
        config={filtersConfig}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openFilter={openFilter}
        onCloseFilter={() => setOpenFilter(false)}
      />
    </>
  )
}

export default observer(Users)
