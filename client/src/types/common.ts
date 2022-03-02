export interface TableColumn {
  key: string
  title: string
  width: number
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  getValue?: (item?: any) => any
  actions?: () => JSX.Element
}
