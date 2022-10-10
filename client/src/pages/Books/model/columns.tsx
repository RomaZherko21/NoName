import i18next from 'i18next'

import { TableColumn } from 'shared/types'

export const getColumns = (): TableColumn[] => [
  {
    key: 'book_name',
    title: i18next.t('book:bookName'),
  },
  {
    key: 'author_name',
    title: i18next.t('book:author'),
  },
  {
    key: 'genre_name',
    title: i18next.t('book:genre'),
  },
]
