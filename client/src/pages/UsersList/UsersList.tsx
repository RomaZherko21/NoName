import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid, Typography } from '@mui/material'

import { CommonTable, Pagination, Spinner } from 'shared/ui'
import { useDialog } from 'shared/hooks'

import { Filters } from 'shared/ui/Filters'

import { CreateUserForm } from './ui'
import { UsersModel, getFiltersConfig, UserFilters, getColumns } from './model'

function UsersList() {
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
      <Grid spacing={2} container style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography variant="h5">{t('pages:usersList')}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={showCreateUserModal}>
            {t('user:form.createNewUser')}
          </Button>
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

export default observer(UsersList)
