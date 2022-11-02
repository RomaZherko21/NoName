import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'

import { AsideFilters, CommonTable, Pagination, Spinner } from 'shared/ui'
import { useDialog } from 'shared/hooks'
import { User } from 'shared/types'

import { UserForm } from './ui'
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
    UsersModel.fetch(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersModel.pagination.page, UsersModel.pagination.perPage, filters])

  const [showCreateUserModal] = useDialog('user:form.createNewUser', (hideModal) => (
    <UserForm
      onSubmit={(value: User) => {
        UsersModel.create(value)
        hideModal()
      }}
    />
  ))

  const columns = useMemo(() => getColumns(), [])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  return (
    <>
      <Helmet>
        <title>{t('page:users')}</title>
        <meta name="description" content={t('page:users')} />
      </Helmet>

      <Grid container sx={{ justifyContent: 'space-between', mb: 5 }}>
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
      <Grid spacing={1} container direction="column">
        <Grid item>
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Search name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ maxWidth: '200px' }}
            />
            <Button
              disableRipple
              color="info"
              endIcon={<FilterListIcon />}
              onClick={handleOpenFilter}
            >
              Filters
            </Button>
          </Paper>
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
        setFilters={setFilters}
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
      />
    </>
  )
}

export default observer(Users)
