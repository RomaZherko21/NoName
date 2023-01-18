import { InputFilter, CheckBoxFilter, DatePickerFilter } from 'shared/ui'

export interface PostsFilters {
  id?: string
  name?: string
  description?: string
  created_from?: number
  created_to?: number
  is_liked?: boolean
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
    key: 'description',
    Control: InputFilter,
    placeholder: 'post:description',
    type: 'input',
  },
  {
    key: 'created_from',
    Control: DatePickerFilter,
    placeholder: 'post:form.createdFrom',
    type: 'date',
  },
  {
    key: 'created_to',
    Control: DatePickerFilter,
    placeholder: 'post:form.createdTo',
    type: 'date',
  },
  {
    key: 'is_liked',
    Control: CheckBoxFilter,
    placeholder: 'post:form.isLiked',
    type: 'check',
  },
]
