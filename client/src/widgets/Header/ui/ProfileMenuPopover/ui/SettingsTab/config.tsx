import { BiSupport } from 'react-icons/bi'

import { ROUTES } from 'shared/consts'

export const getConfig = () => [
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
