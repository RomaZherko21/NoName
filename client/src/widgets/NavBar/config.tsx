import { HiOutlineUsers } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'

import { ROUTES } from 'shared/consts'

export const config = [
  {
    icon: <HiOutlineUsers />,
    title: 'page:users',
    collapsedItems: [
      {
        text: 'List',
        to: ROUTES.USERS,
      },
      {
        text: 'Create',
        to: ROUTES.USERS_NEW,
      },
    ],
  },
  {
    icon: <IoNewspaperOutline />,
    title: 'page:posts',
    collapsedItems: [
      {
        text: 'List',
        to: ROUTES.POSTS,
      },
      {
        text: 'Create',
        to: ROUTES.POSTS_NEW,
      },
    ],
  },
  {
    icon: <IoNewspaperOutline />,
    title: 'page:smth',
    to: ROUTES.HOME,
  },
]
