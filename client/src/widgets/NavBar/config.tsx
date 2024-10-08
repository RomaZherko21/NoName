import { HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftRight, HiOutlineNewspaper } from 'react-icons/hi2'
import { AiOutlineFileJpg } from 'react-icons/ai'
import { BsKanban } from 'react-icons/bs'
import { FiCalendar } from 'react-icons/fi'

import { ROUTES } from 'shared/consts'
import { AccessRoute, Operation } from 'models/Permissions'
import MetaModel from 'models/Meta'

export const config = (meta: MetaModel) => [
  {
    icon: <HiOutlineUsers />,
    title: 'page:users',
    collapsedItems: [
      {
        text: 'List',
        to: ROUTES.USERS,
        accessOperation: Operation.get
      },
      {
        text: 'Create',
        to: ROUTES.USERS_NEW,
        accessOperation: Operation.create
      }
    ],
    accessRoute: AccessRoute.users,
    accessOperation: Operation.get
  },

  {
    icon: <BsKanban />,
    title: 'page:kanban',

    collapsedItems: meta.kanbanBoards.map((item: any) => ({
      text: item.name,
      to: `/kanban/${item.id}`
    })),
    accessRoute: AccessRoute.users,
    accessOperation: Operation.get
  },

  {
    icon: <AiOutlineFileJpg />,
    title: 'page:fileManager',
    to: ROUTES.FILE_MANAGER,
    accessRoute: AccessRoute.files,
    accessOperation: Operation.get
  },
  {
    icon: <HiOutlineNewspaper />,
    title: 'page:posts',
    collapsedItems: [
      {
        text: 'List',
        to: ROUTES.POSTS,
        accessOperation: Operation.get
      },
      {
        text: 'Create',
        to: ROUTES.POSTS_NEW,
        accessOperation: Operation.create
      }
    ],
    accessRoute: AccessRoute.posts,
    accessOperation: Operation.get
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    title: 'page:chat',
    to: ROUTES.CHAT,
    accessRoute: AccessRoute.chat,
    accessOperation: Operation.get
  },
  {
    icon: <FiCalendar />,
    title: 'page:calendar',
    to: ROUTES.CALENDAR,
    // accessRoute: AccessRoute.calendar,
    accessOperation: Operation.get
  }
]
