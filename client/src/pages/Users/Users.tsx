import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { Box, Button, Grid } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { AsideFilters, CommonTable, Spinner } from 'shared/ui'
import { PageHeader } from 'widgets'
import { useDialog } from 'shared/hooks'
import { User } from 'shared/types'

import { TableHeaderActions, UserForm } from './ui'
import { UsersModel, getFiltersConfig, UserFilters, getColumns } from './model'

function Users() {
  const { t } = useTranslation()

  const [openFilter, setOpenFilter] = useState(false)

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  const [filters, setFilters] = useState<UserFilters>({})

  useEffect(() => {
    UsersModel.fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersModel.pagination.page, UsersModel.pagination.limit])

  useEffect(() => {
    UsersModel.changeFilters(filters)
  }, [filters])

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

      <Grid container direction="column">
        <TableHeaderActions
          handleOpenFilter={handleOpenFilter}
          filters={filters}
          onChange={(e: any) => setFilters((pre: any) => ({ ...pre, email: e.target.value }))}
        />
        <Grid item>
          {UsersModel.loading.has ? (
            <Spinner />
          ) : (
            <CommonTable data={UsersModel.users} columns={columns} />
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

export default observer(Users)
