import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { CommonTable, Pagination, Spinner } from 'shared/ui'
import { useDialog } from 'shared/hooks'

import { Filters } from 'shared/ui/Filters'

import { CreateUserForm } from './ui'
import { UsersModel, getFiltersConfig, UserFilters, getColumns } from './model'
import { Helmet } from 'react-helmet'

function Users() {
  const { t } = useTranslation()

  const [filters, setFilters] = useState<UserFilters>({})

  useEffect(() => {
    UsersModel.fetch(filters)
  }, [UsersModel.pagination.page, UsersModel.pagination.perPage, filters])

  const [showCreateUserModal] = useDialog('user:form.createNewUser', (hideModal) => (
    <CreateUserForm hideModal={hideModal} />
  ))

  const columns = useMemo(() => getColumns(), [getColumns])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  return (
    <>
      <Helmet>
        <title>{t('page:users')}</title>
        <meta name="description" content={t('page:users')} />
      </Helmet>

      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h3" color="text.primary">
            {t('page:users')}
          </Typography>
        </Grid>
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
      </Grid>
      <Grid spacing={2} container direction="column">
        <Grid item>
          <Filters config={filtersConfig} setFilters={setFilters} />
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
    </>
  )
}

export default observer(Users)
