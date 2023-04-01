import { observer } from 'mobx-react-lite'
import { Box, Divider } from '@mui/material'

import { Comment as CommentT } from 'shared/types'

import { useRootStore } from 'stores'
import { LeaveComment } from 'shared/ui'
import { API_USER_AVATAR_URL } from 'shared/consts'

import Comment from './Comment'

import { PostModel } from '../../model'

interface Props {
  comments: CommentT[]
}

function Comments({ comments = [] }: Props) {
  const { user } = useRootStore()

  function onSendComment() {
    if (PostModel.isEditActive) {
      PostModel.editComment()
    } else {
      PostModel.addNewComment()
    }
  }

  return (
    <>
      <Divider sx={{ my: 4 }} />
      {comments.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} isOwner={user.id === comment.user_id} />
            ))}
          </Box>
          <Divider sx={{ my: 4 }} />
        </>
      ) : null}

      <LeaveComment
        inputValue={PostModel.commentInputValue}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          PostModel.commentInputValue = e.target.value
        }}
        onSend={onSendComment}
        avatarUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
        label="user:actions.writeYourComment"
        buttonText={PostModel.isEditActive ? 'actions.save' : 'actions.send'}
      />
    </>
  )
}

export default observer(Comments)
