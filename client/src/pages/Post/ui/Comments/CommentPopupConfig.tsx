import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'

import PostModel from '../../model/Post.model'

export const getCommentPopupConfig = (id: number, value: string) => [
  {
    Icon: <CiEdit />,
    text: 'actions.edit',
    onClick: () => {
      PostModel.onEditComment({ id, value })
    },
  },
  {
    Icon: <MdDeleteOutline />,
    text: 'actions.delete',
    onClick: () => {
      PostModel.deleteComment(id)
    },
  },
]
