import { CgProfile } from 'react-icons/cg'
import { generatePath } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import { HiOutlineUsers } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { FiSettings } from 'react-icons/fi'
import {
  MdOutlineNotificationsNone,
  MdOutlineSecurityUpdateGood,
  MdOutlineVerifiedUser,
} from 'react-icons/md'
import { AiOutlineTeam, AiOutlineDollar } from 'react-icons/ai'

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
    icon: <ImExit />,
    text: 'actions.logout',
    onClick: onLogout,
  },
]

export const getSettingsConfig = () => [
  {
    icon: <FiSettings />,
    text: 'page:general',
    to: ROUTES.ACCOUNT_GENERAL,
  },
  {
    icon: <AiOutlineDollar />,
    text: 'page:billing',
    to: ROUTES.ACCOUNT_BILLING,
  },
  {
    icon: <AiOutlineTeam />,
    text: 'page:team',
    to: ROUTES.ACCOUNT_TEAM,
  },
  {
    icon: <MdOutlineNotificationsNone />,
    text: 'page:notifications',
    to: ROUTES.ACCOUNT_NOTIFICATIONS,
  },
  {
    icon: <MdOutlineSecurityUpdateGood />,
    text: 'page:security',
    to: ROUTES.ACCOUNT_SECURITY,
  },
  {
    icon: <MdOutlineVerifiedUser />,
    text: 'page:verification',
    to: ROUTES.ACCOUNT_VERIFICATION,
  },
]
