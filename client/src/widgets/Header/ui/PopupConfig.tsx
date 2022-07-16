import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

import { ROUTES } from 'shared/consts'

export const getPopupConfig = (showConfirmationModal: () => void) => [
  {
    Icon: <AccountBoxIcon />,
    text: 'common.profile',
    linkTo: ROUTES.PROFILE,
  },
  {
    Icon: <MeetingRoomIcon />,
    text: 'actions.exit',
    onClick: () => {
      showConfirmationModal()
    },
  },
]
