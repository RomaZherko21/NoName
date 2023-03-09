import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'

import KanbanModel from '../../model/Kanban.model'

export const getCommentPopupConfig = (id: number, value: string) => [
  {
    Icon: <CiEdit />,
    text: 'actions.edit',
    onClick: () => {
      // KanbanModel.onEditComment({ id, value })
    },
  },
  {
    Icon: <MdDeleteOutline />,
    text: 'actions.delete',
    onClick: () => {
      // KanbanModel.deleteComment(id)
    },
  },
]