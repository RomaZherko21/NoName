import i18next from 'i18next'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

import { ROUTES } from 'services'

export const getPopupConfig = (showConfirmationModal: () => void) => [
  {
    Icon: <AccountBoxIcon />,
    text: i18next.t('common.profile'),
    linkTo: ROUTES.PROFILE,
  },
  {
    Icon: <MeetingRoomIcon />,
    text: i18next.t('actions.exit'),
    onClick: () => {
      showConfirmationModal()
    },
  },
]
