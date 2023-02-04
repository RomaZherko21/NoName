import { observer } from 'mobx-react-lite'
import { Box, Divider } from '@mui/material'

import { Comment as CommentT } from 'shared/types'

import { useRootStore } from 'stores'
import { LeaveComment } from 'shared/ui'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

import Comment from './Comment'

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

      <LeaveComment
        avatarUrl={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
        label="user:actions.writeYourComment"
      />
    </>
  )
}

export default observer(Comments)
