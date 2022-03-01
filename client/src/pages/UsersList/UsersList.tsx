import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import CommonTable from 'components/CommonTable/CommonTable'
import { useDialog } from 'hooks'

import { getColumns } from './columns'
import CreateUserForm from './CreateUserForm/CreateUserForm'

const users = [
  {
    id: 1,
    name: 'er',
    surname: 'er',
    password: 'HELL',
    email: 'er',
    role_id: 1,
    role: 'admin',
  },
]

const UsersList = () => {
  const [showCreateUserModal] = useDialog('Create new user', (hideModal) => (
    <CreateUserForm hideModal={hideModal} />
  ))

  const columns = useMemo(() => getColumns(), [getColumns])

  return (
    <Grid spacing={2} container direction="column">
      <Grid item alignSelf="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={showCreateUserModal}
        >
          Create new user
        </Button>
      </Grid>
      <Grid item>
        <CommonTable data={users} columns={columns} />
      </Grid>
    </Grid>
  )
}

export default observer(UsersList)
