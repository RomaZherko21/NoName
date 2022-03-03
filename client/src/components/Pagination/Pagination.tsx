import * as React from 'react'
import { Pagination as MUiPagination } from '@mui/material'
import Stack from '@mui/material/Stack'

const Pagination = () => {
  return (
    <Stack spacing={2}>
      <MUiPagination
        count={10}
        color="primary"
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          console.log(event, page)
        }}
      />
    </Stack>
  )
}

export default Pagination
