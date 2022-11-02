import { observer } from 'mobx-react-lite'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from '@mui/material'

import PaginationModel from 'models/Pagination'
import { TableColumn } from 'shared/types'

import { Pagination } from '../Pagination'

interface Props {
  data: any
  columns: TableColumn[]
  paginationModel?: PaginationModel
}

const CommonTable = ({ data, columns, paginationModel }: Props) => {
  return (
    <TableContainer component={Paper}>
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
        {paginationModel && (
          <TableFooter>
            <Pagination paginationModel={paginationModel} />
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  )
}

export default observer(CommonTable)
