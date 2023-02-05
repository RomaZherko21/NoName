export interface TableColumn {
  key: string
  title: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  getValue?: (post?: any) => any
  actions?: () => JSX.Element
}

export interface SortParams {
  order_by?: string
  order_type?: string
}
