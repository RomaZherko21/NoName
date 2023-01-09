import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { generatePath } from 'react-router-dom'

import { ROUTES } from 'shared/consts'

import { PostsModel } from '../model'

export const getPopupConfig = (navigate: any) => [
  {
    Icon: <AccountBoxIcon />,
    text: 'common.details',
    onClick: (id: number) => {
      navigate(generatePath(ROUTES.POST, { id: String(id) }))
      console.log(id)
    },
  },
  {
    Icon: <DeleteIcon />,
    text: 'actions.delete',
    onClick: (id: number) => {
      PostsModel.remove(id)
    },
  },
]
