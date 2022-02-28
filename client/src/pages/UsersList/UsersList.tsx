import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '@mui/material'

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
  },
]

const UsersList = () => {
  const [showCreateUserModal] = useDialog('Create new user', <CreateUserForm />)

  const columns = useMemo(() => getColumns(), [getColumns])

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={showCreateUserModal}
      >
        Create new user
      </Button>
      <CommonTable data={users} columns={columns} />
    </>
  )
}

export default observer(UsersList)
