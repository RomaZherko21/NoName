import { generatePath, NavigateFunction } from 'react-router-dom'
import i18next from 'i18next'
import { toast } from 'react-toastify'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DeleteIcon from '@mui/icons-material/Delete'

import { ROUTES } from 'shared/consts'

import { PostsModel } from '../model'

export const getPopupConfig = (navigate: NavigateFunction) => [
  {
    Icon: <AccountBoxIcon />,
    text: 'common.details',
    onClick: (id: number) => {
      navigate(generatePath(ROUTES.POST, { id: String(id) }))
    },
  },
  {
    Icon: <DeleteIcon />,
    text: 'actions.delete',
    onClick: (id: number) => {
      PostsModel.remove(id)
      toast.success(i18next.t('notification:success.deleted'))
    },
  },
]
