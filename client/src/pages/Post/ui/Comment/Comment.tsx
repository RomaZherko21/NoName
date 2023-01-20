import { Box, Typography, Stack, Avatar } from '@mui/material'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { Comment as CommentT } from 'shared/types'

interface Props {
  comment: CommentT
}

function Comment({ comment }: Props) {
  return (
    <Box m={4} mt={3} mb={2} key={comment.id}>
      <Stack alignItems="start" direction="row" spacing={3}>
        <Avatar
          alt="User avatar"
          sx={{ cursor: 'pointer', width: 40, height: 40 }}
          src={`${NODE_API_USER_AVATAR_URL}/${comment.user_avatar}`}
        />
        <Stack direction="column" width="100%" spacing={3}>
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            pt={2}
            sx={{
              border: (theme) =>
                comment.user_id === 1
                  ? `1px solid ${theme.palette.grey[700]}`
                  : `1px solid ${theme.palette.grey[800]}`,
              backgroundColor: (theme) =>
                comment.user_id === 1 ? theme.palette.grey[700] : theme.palette.grey[800],
              borderRadius: '8px',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Fasfsdf Fsxfsdf</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(comment.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="body2">{comment.message}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Comment
