export type ID = number

export type Pagination = {
  limit: number
  offset: number
}

export type Sorting = {
  orderBy: string
  orderType: 'ASC' | 'DESC'
}
