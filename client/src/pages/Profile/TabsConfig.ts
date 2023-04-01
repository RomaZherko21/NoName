import { generatePath } from 'react-router-dom'

import { ROUTES } from 'shared/consts'

import { Connections, Posts, UserInfo } from './ui'

export const getTabsConfig = (id: number) => [
  {
    label: 'page:profile',
    to: generatePath(ROUTES.USERS_PROFILE, { id }),
    Component: UserInfo
  },
  {
    label: 'page:connections',
    to: generatePath(ROUTES.USERS_CONNECTIONS, { id }),
    Component: Connections
  },
  {
    label: 'page:posts',
    to: generatePath(ROUTES.USERS_POSTS, { id }),
    Component: Posts
  }
]
