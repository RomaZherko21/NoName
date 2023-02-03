import { observer } from 'mobx-react-lite'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { TableColumn } from 'shared/types'

interface Props {
  data: any[]
  columns: TableColumn[]
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
        {data.map((row: any) => (
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
