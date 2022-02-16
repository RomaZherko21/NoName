import { TableColumn } from 'types/common'

export const getColumns = (): TableColumn[] => [
  {
    key: 'id',
    title: 'id',
    width: 100,
    align: 'right',
  },
  {
    key: 'name',
    title: 'name',
    width: 100,
    align: 'right',
  },
  {
    key: 'surname',
    title: 'surname',
    width: 100,
    align: 'right',
  },
  {
    key: 'email',
    title: 'email',
    width: 100,
    align: 'right',
  },
  {
    key: 'role_id',
    title: 'role',
    width: 100,
    align: 'right',
  },
]
