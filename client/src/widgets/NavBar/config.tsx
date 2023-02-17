import { HiOutlineUsers } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { HiOutlineNewspaper } from 'react-icons/hi2'

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
    icon: <HiOutlineNewspaper />,
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
    icon: <HiOutlineChatBubbleLeftRight />,
    title: 'page:chat',
    to: ROUTES.CHAT,
  },
  {
    icon: <IoNewspaperOutline />,
    title: 'page:smth',
    to: ROUTES.HOME,
  },
]
