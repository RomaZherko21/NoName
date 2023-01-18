import { InputFilter } from 'shared/ui'

export interface BooksFilters {
  id?: string
  email?: string
  name?: string
  surname?: string
}

export const getFiltersConfig = () => [
  {
    key: 'id',
    Control: InputFilter,
    placeholder: 'common.id',
    type: 'input',
  },
  {
    key: 'name',
    Control: InputFilter,
    placeholder: 'user:name',
    type: 'input',
  },
  {
    key: 'surname',
    Control: InputFilter,
    placeholder: 'user:surname',
    type: 'input',
  },
  {
    key: 'email',
    Control: InputFilter,
    placeholder: 'user:email',
    type: 'input',
  },
]
