import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import { FiMoreVertical } from 'react-icons/fi'

import { API_USER_AVATAR_URL } from 'shared/consts'
import { Comment as CommentT } from 'shared/types'
import { fromTimestampToDate } from 'shared/helpers'
import { PopupMenu } from 'shared/ui'

import { getCommentPopupConfig } from './CommentPopupConfig'

interface Props {
  comment: CommentT
  isOwner: boolean
}

function Comment({ comment, isOwner }: Props) {
  const popupConfig = useMemo(
    () => getCommentPopupConfig(comment.id, comment.message),
    [comment.id, comment.message]
  )

  return (
    <Box key={comment.id} sx={{ display: 'flex', gap: 1 }}>
      <Avatar
        alt="User avatar"
        sx={{ width: 40, height: 40 }}
        src={`${API_USER_AVATAR_URL}/${comment.user_avatar}`}
      />
      <Box
        sx={{
          p: 2,
          width: '100%',
          backgroundColor: (theme) =>
            isOwner ? theme.palette.grey[800] : theme.palette.background.paper,
          borderRadius: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body2">
            {comment.user_name} {comment.user_surname}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">{fromTimestampToDate(comment.created_at)}</Typography>
            {isOwner && (
              <PopupMenu
                ActionButton={(btnProps) => (
                  <IconButton {...btnProps} aria-label="settings" sx={{ p: 0.25, fontSize: 18 }}>
                    <FiMoreVertical />
                  </IconButton>
                )}
                config={popupConfig}
              />
            )}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word' }}>
          {comment.message}
        </Typography>
      </Box>
    </Box>
  )
}

export default observer(Comment)
