import { InputFilter } from 'shared/ui/Filters/InputFilter'

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
  },
  {
    key: 'name',
    Control: InputFilter,
    placeholder: 'user:name',
  },
  {
    key: 'surname',
    Control: InputFilter,
    placeholder: 'user:surname',
  },
  {
    key: 'email',
    Control: InputFilter,
    placeholder: 'user:email',
  },
]
