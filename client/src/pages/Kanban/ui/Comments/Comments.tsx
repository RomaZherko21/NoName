import { observer } from 'mobx-react-lite'
import { Box, Stack, Divider } from '@mui/material'
import Comment from './Comment'
import { LeaveComment } from 'shared/ui'
import { KanbanModel } from 'pages/Kanban/model'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { useRootStore } from 'stores'

function Comments() {
  const { user } = useRootStore()

  function onSendComment() {
    console.log('send')
    //     if (KanbanModel.isEditActive) {
    //         KanbanModel.editComment()
    //     } else {
    //         KanbanModel.addNewComment()
    //     }
  }

  return (
    <Stack
      sx={{
        gap: 2,
        p: '24px',
        pt: 0
      }}
    >
      {1 && (
        <>
          <Stack sx={{ gap: 2 }}>
            {[1].map((item) => (
              <Comment key={item} />
            ))}
          </Stack>
        </>
      )}
      <Box>
        <Divider />
        <LeaveComment
          inputValue={KanbanModel.commentInputValue}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            KanbanModel.commentInputValue = e.target.value
          }}
          onSend={onSendComment}
          avatarUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          label="user:actions.writeYourComment"
          buttonText={KanbanModel.isEditActive ? 'actions.save' : 'actions.send'}
        />
      </Box>
    </Stack>
  )
}

export default observer(Comments)
