import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DeleteIcon from '@mui/icons-material/Delete'
import i18next from 'i18next'

import { ROUTES } from 'shared/consts'

import { ItemsModel } from '../model'

export const getPopupConfig = () => [
  {
    Icon: <AccountBoxIcon />,
    text: i18next.t('common.details'),
    linkTo: ROUTES.PROFILE,
  },
  {
    Icon: <DeleteIcon />,
    text: i18next.t('actions.delete'),
    onClick: (id: number) => {
      ItemsModel.remove(id)
    },
  },
]
