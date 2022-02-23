import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '@mui/material'

import CommonTable from 'components/CommonTable/CommonTable'
import { useDialog } from 'hooks'

import UsersModel from './Users.model'
import { getColumns } from './columns'
import CreateUserForm from './createUserForm/CreateUserForm'

const UsersList = () => {
  const columns = useMemo(() => getColumns(), [getColumns])

  const [showModal] = useDialog('Create new user', <CreateUserForm />)

  return (
    <>
      <Button variant="contained" color="secondary" onClick={showModal}>
        Create new user
      </Button>
      <CommonTable data={UsersModel.users} columns={columns} />
    </>
  )
}

export default observer(UsersList)
