import i18next from 'i18next'

import { TableColumn } from 'shared/types'

export const getColumns = (): TableColumn[] => [
  {
    key: 'id',
    title: 'id',
  },
  {
    key: 'name',
    title: i18next.t('user:name'),
  },
  {
    key: 'priceUsd',
    title: i18next.t('user:surname'),
  },
  {
    key: 'symbol',
    title: i18next.t('user:email'),
  },
]
