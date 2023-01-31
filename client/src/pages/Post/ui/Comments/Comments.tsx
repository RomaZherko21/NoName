import { observer } from 'mobx-react-lite'
import { Box, Divider } from '@mui/material'

import { Comment as CommentT } from 'shared/types'

import Comment from './Comment'
import { useRootStore } from 'stores'
import LeaveComment from './LeaveComment'

interface Props {
  comments: CommentT[]
}

function Comments({ comments = [] }: Props) {
  const { user } = useRootStore()

  return (
    <>
      <Divider sx={{ my: 4 }} />
      {comments.length && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map((comment) => (
              <Comment comment={comment} isOwner={user.id === comment.user_id} />
            ))}
          </Box>
        </>
      )}
      <Divider sx={{ my: 4 }} />

      <LeaveComment />
    </>
  )
}

export default observer(Comments)
