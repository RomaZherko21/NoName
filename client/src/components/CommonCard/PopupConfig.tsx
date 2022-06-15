import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DeleteIcon from '@mui/icons-material/Delete'
import i18next from 'i18next'

import { routes } from 'services'

export const getPopupConfig = () => [
  {
    Icon: <AccountBoxIcon />,
    text: i18next.t('common.details'),
    linkTo: routes.profile,
  },
  {
    Icon: <DeleteIcon />,
    text: i18next.t('actions.delete'),
    onClick: () => {
      console.log('fuck')
    },
  },
]
