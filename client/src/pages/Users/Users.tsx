import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { Box, Button, Grid } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { AsideFilters, AsideFiltersBar, CommonTable, Pagination, Spinner } from 'shared/ui'
import { PageHeader } from 'widgets'
import { useDialog } from 'shared/hooks'
import { User } from 'shared/types'

import { UserForm } from './ui'
import { UsersModel, getFiltersConfig, getColumns } from './model'

function Users() {
  const { t } = useTranslation()

  const [openFilter, setOpenFilter] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  useEffect(() => {
    UsersModel.debounceFetch({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersModel.pagination.page, UsersModel.pagination.perPage, searchParams])

  const [showCreateUserModal] = useDialog('user:form.createNewUser', (hideModal) => (
    <UserForm
      onSubmit={(value: User) => {
        UsersModel.create(value)
        hideModal()
        toast.success(t('notification:success.created'))
      }}
    />
  ))

  const columns = useMemo(() => getColumns(), [])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

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

      <Grid spacing={1} container direction="column">
        <Grid item>
          <AsideFiltersBar
            value={searchParams.get('email') || ''}
            onChange={(e: any) => {
              searchParams.set('email', e.target.value)
              setSearchParams(searchParams)
            }}
            handleOpenFilter={handleOpenFilter}
            placeholder="user:actions.searchEmail"
          />
        </Grid>
        <Grid item>
          {UsersModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={UsersModel.users} columns={columns} />
          )}
        </Grid>
        <Grid item>
          <Pagination paginationModel={UsersModel.pagination} />
        </Grid>
      </Grid>

      <AsideFilters
        config={filtersConfig}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
      />
    </>
  )
}

export default observer(Users)
