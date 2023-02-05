import { observer } from 'mobx-react-lite'
import { TablePagination } from '@mui/material'

import PaginationModel from 'models/Pagination'

interface Props {
  paginationModel: PaginationModel
}

const Pagination = ({ paginationModel }: Props) => {
  return (
    <TablePagination
      rowsPerPageOptions={paginationModel.perPageArr}
      component="div"
      count={paginationModel.totalCount}
      rowsPerPage={paginationModel.limit}
      page={paginationModel.currentPage}
      onPageChange={(event: unknown, newPage: number) => {
        paginationModel.currentPage = newPage
      }}
      onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        paginationModel.limit = Number(event.target.value)
        paginationModel.currentPage = 0
      }}
    />
  )
}

export default observer(Pagination)
