import { GENDER, ROLES } from 'shared/consts'
import { InputFilter, SelectFilter } from 'shared/ui'

export interface UserFilters {
  id?: string
  name?: string
  surname?: string
  middle_name?: string
  email?: string
  gender?: string
  role?: string
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
    key: 'middle_name',
    Control: InputFilter,
    placeholder: 'user:middleName',
    type: 'input',
  },
  {
    key: 'email',
    Control: InputFilter,
    placeholder: 'user:email',
    type: 'input',
  },
  {
    key: 'gender',
    placeholder: 'user:gender',
    Control: SelectFilter,
    type: 'select',
    options: GENDER,
  },
  {
    key: 'role',
    placeholder: 'user:role',
    Control: SelectFilter,
    type: 'select',
    options: ROLES,
  },
]
