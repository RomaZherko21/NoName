export interface TableColumn {
  key: string
  title: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  getValue?: (post?: any) => any
  actions?: () => JSX.Element
}

export interface QuerySortParams {
  order_by?: string
  order_type?: string
}

export interface QueryPaginationParams {
  limit?: string
  page?: string
}

export type QueryParams = { [key: string]: any } & QuerySortParams & QueryPaginationParams
