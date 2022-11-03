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
]
