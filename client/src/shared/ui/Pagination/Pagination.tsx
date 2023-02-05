import { useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { TablePagination } from '@mui/material'

import PaginationModel from 'models/Pagination'
import { useEffect } from 'react'

interface Props {
  paginationModel: PaginationModel
}

const Pagination = ({ paginationModel }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    paginationModel.currentPage = Number(searchParams.get('page'))
    paginationModel.limit = Number(searchParams.get('limit'))
  }, [])

  function onPageChange(event: unknown, newPage: number) {
    paginationModel.currentPage = newPage

    setSearchParams((searchParams: URLSearchParams) => {
      searchParams.set('page', String(newPage))
      return searchParams
    })
  }

  function onRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    paginationModel.limit = Number(event.target.value)
    paginationModel.currentPage = 0

    setSearchParams((searchParams: URLSearchParams) => {
      searchParams.set('limit', event.target.value)
      searchParams.set('page', '0')
      return searchParams
    })
  }

  return (
    <TablePagination
      rowsPerPageOptions={paginationModel.perPageArr}
      component="div"
      count={paginationModel.totalCount}
      rowsPerPage={paginationModel.limit}
      page={paginationModel.currentPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  )
}

export default observer(Pagination)
