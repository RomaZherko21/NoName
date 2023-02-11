import { CgProfile } from 'react-icons/cg'
import { RiUserSettingsLine } from 'react-icons/ri'
import { generatePath } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import { BiSupport } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'

import { ROUTES } from 'shared/consts'

export const getProfileConfig = ({ id, onLogout }: { id: number; onLogout: () => void }) => [
  {
    icon: <CgProfile />,
    text: 'user:socialProfile',
    to: generatePath(ROUTES.USERS_PROFILE, { id }),
  },
  {
    icon: <HiOutlineUsers />,
    text: 'user:connections',
    to: generatePath(ROUTES.USERS_CONNECTIONS, { id }),
  },
  {
    icon: <IoNewspaperOutline />,
    text: 'user:userPosts',
    to: generatePath(ROUTES.USERS_POSTS, { id }),
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
    to: ROUTES.USERS_PROFILE,
  },
  {
    icon: <BiSupport />,
    text: 'Social Profile',
    to: ROUTES.ACCOUNT_GENERAL,
  },
]
