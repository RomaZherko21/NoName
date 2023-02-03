export interface TableColumn {
  key:
    | 'name'
    | 'full_name'
    | 'email'
    | 'gender'
    | 'date_of_birth'
    | 'tel_number'
    | 'role'
    | 'friends'
    | 'actions'
  title: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined
  getValue?: (post?: any) => any
  actions?: () => JSX.Element
}
