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
    paginationModel.currentPage = Number(searchParams.get('page')) || 0
    paginationModel.limit = Number(searchParams.get('limit')) || 10

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPageChange(event: unknown, newPage: number) {
    paginationModel.currentPage = newPage || 0

    setSearchParams((searchParams: URLSearchParams) => {
      searchParams.set('page', String(newPage))
      searchParams.set('limit', String(paginationModel.limit))
      return searchParams
    })
  }

  function onRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    paginationModel.limit = Number(event.target.value) || 10
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
