import { GENDER } from 'shared/consts'
import { InputFilter, SelectFilter } from 'shared/ui'

export interface SubscriberFilters {
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
]
