import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '@mui/material'

import CommonTable from 'components/CommonTable/CommonTable'

import UserModel from './Users.model'
import { getColumns } from './columns'

const UsersList = () => {
  const columns = useMemo(() => getColumns(), [getColumns])

  const onCreateUser = () => {
    UserModel.create({
      name: 'roma',
      surname: 'zherko',
      email: 'Romaasd@asd.asd',
      password: 'qwerqwer',
      role_id: 2,
    })
  }

  return (
    <>
      <CommonTable data={UserModel.users} columns={columns} />
      <Button variant="contained" color="secondary" onClick={onCreateUser}>
        Create new user
      </Button>
    </>
  )
}

export default observer(UsersList)
