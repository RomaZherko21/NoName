import { GENDER, ROLES } from 'shared/consts'
import { Input, Select } from 'shared/ui'

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
    Control: Input,
    placeholder: 'common.id',
    type: 'input'
  },
  {
    key: 'name',
    Control: Input,
    placeholder: 'user:name',
    type: 'input'
  },
  {
    key: 'surname',
    Control: Input,
    placeholder: 'user:surname',
    type: 'input'
  },
  {
    key: 'middle_name',
    Control: Input,
    placeholder: 'user:middleName',
    type: 'input'
  },
  {
    key: 'email',
    Control: Input,
    placeholder: 'user:email',
    type: 'input'
  },
  {
    key: 'gender',
    placeholder: 'user:gender',
    Control: Select,
    type: 'select',
    options: GENDER
  },
  {
    key: 'role',
    placeholder: 'user:role',
    Control: Select,
    type: 'select',
    options: ROLES
  }
]
