import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { ProfileModel } from 'pages/Profile/model'
import { PostsFilters } from 'pages/Posts/model'

export const getCommentPopupConfig = ({
  post_id,
  comment_id,
  comment_value,
  filters,
}: {
  post_id: number
  comment_id: number
  comment_value: string
  filters: PostsFilters
}) => [
  {
    Icon: <EditIcon />,
    text: 'actions.edit',
    onClick: () => {
      ProfileModel.isEditActive = true
      ProfileModel.comment = comment_value
      ProfileModel.editCommentId = comment_id
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    },
  },
  {
    Icon: <DeleteIcon />,
    text: 'actions.delete',
    onClick: () => {
      ProfileModel.deleteComment({ post_id: post_id, comment_id: comment_id, filters: filters })
    },
  },
]
