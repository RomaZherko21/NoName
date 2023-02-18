import { HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { HiOutlineNewspaper } from 'react-icons/hi2'
import { AiOutlineFileJpg } from 'react-icons/ai'

import { ROUTES } from 'shared/consts'
import { AccessRoute } from 'models/Permissions'

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
    accessRoute: AccessRoute.users,
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
    accessRoute: AccessRoute.posts,
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    title: 'page:chat',
    to: ROUTES.CHAT,
    accessRoute: AccessRoute.chat,
  },
  {
    icon: <AiOutlineFileJpg />,
    title: 'page:fileManager',
    to: ROUTES.FILE_MANAGER,
    accessRoute: AccessRoute.files,
  },
]
