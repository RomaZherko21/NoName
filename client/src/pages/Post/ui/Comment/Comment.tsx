import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Stack, Avatar, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { Comment as CommentT } from 'shared/types'
import { useRootStore } from 'stores'
import { PopupMenu } from 'shared/ui'

import { getCommentPopupConfig } from '../CommentPopupConfig'

interface Props {
  comment: CommentT
}

function Comment({ comment }: Props) {
  const { user } = useRootStore()
  const popupConfig = useMemo(
    () => getCommentPopupConfig(comment.id, comment.message),
    [comment.id, comment.message]
  )

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
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">
                {comment.user_name} {comment.user_surname}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" color="textSecondary">
                  {new Date(comment.created_at).toLocaleDateString()}
                </Typography>
                {user.id === comment.user_id && (
                  <IconButton aria-label="settings">
                    <PopupMenu
                      ActionButton={(btnProps: any) => <MoreVertIcon {...btnProps} />}
                      config={popupConfig}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography variant="body2">{comment.message}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default observer(Comment)
