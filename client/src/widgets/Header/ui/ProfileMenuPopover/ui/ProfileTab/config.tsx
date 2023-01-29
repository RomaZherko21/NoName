import { CgProfile } from 'react-icons/cg'
import { RiUserSettingsLine } from 'react-icons/ri'
import { ImExit } from 'react-icons/im'

import { ROUTES } from 'shared/consts'

export const getConfig = ({ onLogout }: { onLogout: () => void }) => [
  {
    icon: <CgProfile />,
    text: 'user:socialProfile',
    to: ROUTES.PROFILE_TIMELINE,
  },
  {
    icon: <RiUserSettingsLine />,
    text: 'user:editProfile',
    to: ROUTES.ACCOUNT_GENERAL,
  },
  {
    icon: <ImExit />,
    text: 'actions.logout',
    onClick: onLogout,
  },
]
