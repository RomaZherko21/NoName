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
    key: 'middle_name',
    Control: InputFilter,
    placeholder: 'user:middleName',
  },
  {
    key: 'email',
    Control: InputFilter,
    placeholder: 'user:email',
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
