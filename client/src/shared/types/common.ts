export interface TableColumn {
  key: string
  title: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  getValue?: (item?: any) => any
  actions?: () => JSX.Element
}
