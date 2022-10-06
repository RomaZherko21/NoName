import i18next from 'i18next'

import { TableColumn } from 'shared/types'

export const getColumns = (): TableColumn[] => [
  {
    key: 'book_name',
    title: 'book_name',
  },
  {
    key: 'author_name',
    title: i18next.t('user:author_name'),
  },
  {
    key: 'genre_name',
    title: i18next.t('user:genre_name'),
  },
]
