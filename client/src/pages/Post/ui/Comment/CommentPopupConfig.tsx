import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import PostModel from '../../model/Post.model'

export const getCommentPopupConfig = (id: number, comment_value: string) => [
  {
    Icon: <EditIcon />,
    text: 'actions.edit',
    onClick: () => {
      PostModel.isEditActive = true
      PostModel.comment = comment_value
      PostModel.editCommentId = id
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    },
  },
  {
    Icon: <DeleteIcon />,
    text: 'actions.delete',
    onClick: () => {
      PostModel.deleteComment(id)
    },
  },
]
