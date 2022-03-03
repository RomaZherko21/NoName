import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import CommonTable from 'components/CommonTable/CommonTable'
import { useDialog } from 'hooks'
import Pagination from 'components/Pagination'

import { getColumns } from './columns'
import CreateUserForm from './CreateUserForm/CreateUserForm'
import UsersModel from './Users.model'

const UsersList = () => {
  const { t } = useTranslation()

  const [showCreateUserModal] = useDialog(
    'user:form.createNewUser',
    (hideModal) => <CreateUserForm hideModal={hideModal} />
  )

  const columns = useMemo(() => getColumns(), [getColumns])

  useEffect(() => {
    UsersModel.init()
  }, [])

  return (
    <Grid spacing={2} container direction="column">
      <Grid item alignSelf="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={showCreateUserModal}
        >
          {t('user:form.createNewUser')}
        </Button>
      </Grid>
      <Grid item>
        <CommonTable data={UsersModel.users} columns={columns} />
      </Grid>
      <Grid item>
        <Pagination />
      </Grid>
    </Grid>
  )
}

export default observer(UsersList)
