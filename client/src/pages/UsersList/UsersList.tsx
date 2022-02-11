import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import CommonTable from 'components/CommonTable/CommonTable'
import UserModel from './Users.model'

const rows = [
  {
    name: 'Name',
    surname: 'surname',
    role: 'role',
    password: 'password',
    email: 'email',
  },
]

const UsersList = () => {
  const users = useMemo(() => new UserModel(), [])

  console.log('USER LIST')
  return <CommonTable bodyRows={rows} />
}

export default observer(UsersList)
