import { observer } from 'mobx-react-lite'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { TableColumn, User, Roles, Gender } from 'shared/types'

interface Props {
  data: User[]
  columns: TableColumn[]
}

interface Row {
  name: string
  full_name?: string
  id?: number
  email: string
  role: Roles
  date_of_birth?: string
  tel_number?: string
  gender?: Gender
  friends?: string
  actions?: string
}

const CommonTable = ({ data, columns }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key} align={column.align || 'left'}>
              {column.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row: Row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align || 'left'}>
                {column.getValue ? column.getValue(row) : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default observer(CommonTable)
