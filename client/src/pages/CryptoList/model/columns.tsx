import i18next from 'i18next'

import { TableColumn, TCrypto } from 'shared/types'

export const getColumns = (): TableColumn[] => [
  {
    key: 'image',
    title: i18next.t('crypto:logo'),
    getValue: (row: TCrypto) => {
      const img = row.image.split('/')
      const name = img[img.length - 1]
      return <img alt={name} src={`https://static.simpleswap.io/images/currencies-logo/${name}`} />
    },
  },
  {
    key: 'name',
    title: i18next.t('crypto:name'),
  },
  {
    key: 'symbol',
    title: i18next.t('crypto:shortName'),
  },
]
