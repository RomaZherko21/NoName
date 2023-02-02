import { observer } from 'mobx-react-lite'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import { TableColumn } from 'shared/types'
import { UsersModel } from 'pages/Users/model'
import { Pagination } from 'shared/ui'

interface Props {
  data: any
  columns: TableColumn[]
}

const CommonTable = ({ data, columns }: Props) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '0 0 20px 20px' }}>
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
        <Pagination paginationModel={UsersModel.pagination} />
      </TableContainer>
    </>
  )
}

export default observer(CommonTable)
