import { HiOutlineUsers } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftRight, HiOutlineNewspaper } from 'react-icons/hi2'
import { AiOutlineFileJpg } from 'react-icons/ai'
import { BsKanban } from 'react-icons/bs'

import { ROUTES } from 'shared/consts'
import { AccessRoute, Operation } from 'models/Permissions'
// import { KanbanModel } from 'pages/Kanban/model'

export const config = [
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
    //думаю сюда лепить map

    icon: <BsKanban />,
    title: 'page:kanban',
    // to: KanbanModel.fetchBoards(), // сюда запрос на получение всех boards
    get: 'boards',
    collapsedItems: [
      {
        text: 'Board#1',
        to: ROUTES.KANBAN,
        accessOperation: Operation.get
      }
    ],
    accessRoute: AccessRoute.users,
    accessOperation: Operation.get

    // accessRoute: AccessRoute.kanban,
    // accessOperation: Operation.get,
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
  }
]
