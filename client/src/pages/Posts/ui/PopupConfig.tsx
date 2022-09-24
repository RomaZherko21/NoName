import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DeleteIcon from '@mui/icons-material/Delete'

import { ROUTES } from 'shared/consts'

import { PostsModel } from '../model'

export const getPopupConfig = () => [
  {
    Icon: <AccountBoxIcon />,
    text: 'common.details',
    linkTo: ROUTES.PROFILE,
  },
  {
    Icon: <DeleteIcon />,
    text: 'actions.delete',
    onClick: (id: number) => {
      PostsModel.remove(id)
    },
  },
]
