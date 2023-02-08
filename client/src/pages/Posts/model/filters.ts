import { Input, Checkbox, DatePicker } from 'shared/ui'

export interface PostsFilters {
  id?: string
  user_id?: number
  name?: string
  description?: string
  created_from?: number
  created_to?: number
  is_liked?: boolean
}

export const getFiltersConfig = () => [
  {
    key: 'id',
    Control: Input,
    placeholder: 'common.id',
    type: 'input',
  },
  {
    key: 'name',
    Control: Input,
    placeholder: 'user:name',
    type: 'input',
  },
  {
    key: 'description',
    Control: Input,
    placeholder: 'post:description',
    type: 'input',
  },
  {
    key: 'created_from',
    Control: DatePicker,
    placeholder: 'fields.createdFrom',
    type: 'date',
  },
  {
    key: 'created_to',
    Control: DatePicker,
    placeholder: 'fields.createdTo',
    type: 'date',
  },
  {
    key: 'is_liked',
    Control: Checkbox,
    placeholder: 'post:form.isLiked',
    type: 'checkbox',
  },
]
