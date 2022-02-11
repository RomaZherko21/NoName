import { observer } from 'mobx-react-lite'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import UserModel from './Users.model'
import HeaderRow from './constants'

const UsersList = () => {
  const { id, name, surname, email, role } = HeaderRow

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{id}</TableCell>
              <TableCell align="right">{name}</TableCell>
              <TableCell align="right">{surname}</TableCell>
              <TableCell align="right">{email}</TableCell>
              <TableCell align="right">{role}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserModel.users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.surname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={onCreateUser}>
        Create new user
      </Button>
    </>
  )
}

export default observer(UsersList)
