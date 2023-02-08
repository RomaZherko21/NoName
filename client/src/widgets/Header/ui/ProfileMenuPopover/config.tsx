import { CgProfile } from 'react-icons/cg'
import { RiUserSettingsLine } from 'react-icons/ri'
import { ImExit } from 'react-icons/im'
import { BiSupport } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'

import { ROUTES } from 'shared/consts'

export const getProfileConfig = ({ onLogout }: { onLogout: () => void }) => [
  {
    icon: <CgProfile />,
    text: 'user:socialProfile',
    to: ROUTES.PROFILE_TIMELINE,
  },
  {
    icon: <HiOutlineUsers />,
    text: 'user:connections',
    to: ROUTES.PROFILE_CONNECTIONS,
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

export const getSettingsConfig = () => [
  {
    icon: <BiSupport />,
    text: 'Edit Profile',
    to: ROUTES.PROFILE_TIMELINE,
  },
  {
    icon: <BiSupport />,
    text: 'Social Profile',
    to: ROUTES.ACCOUNT_GENERAL,
  },
]
