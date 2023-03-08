import i18next from 'i18next'
import { Typography } from '@mui/material'

import { Entrances, TableColumn } from 'shared/types'

export const getColumns = (): TableColumn[] => [
  {
    key: 'login_type',
    title: i18next.t('user:loginType'),
    getValue: ({ login_type, date }: Entrances) => (
      <>
        <Typography variant="body2" color="text.primary">
          {login_type}
        </Typography>
        <Typography variant="body2" color="text.primary">
          on {date}
        </Typography>
      </>
    ),
  },
  {
    key: 'ip_address',
    title: i18next.t('user:ipAddress'),
    getValue: ({ ip_address }: Entrances) => (
      <Typography variant="body2" color="text.primary">
        {ip_address}
      </Typography>
    ),
  },
  {
    key: 'client',
    title: i18next.t('user:client'),
    getValue: ({ client }: Entrances) => (
      <Typography variant="body2" color="text.primary">
        {client}
      </Typography>
    ),
  },
]
