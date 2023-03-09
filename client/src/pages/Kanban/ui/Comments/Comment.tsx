import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import { FiMoreVertical } from 'react-icons/fi'

import { API_USER_AVATAR_URL } from 'shared/consts'
import { Comment as CommentT } from 'shared/types'
import { PopupMenu } from 'shared/ui'

import { getCommentPopupConfig } from './CommentPopupConfig'

function Comment() {
  const isOwner = true

  const popupConfig = useMemo(() => getCommentPopupConfig(1, 'Ben'), [])

  return (
    <Box key={1} sx={{ display: 'flex', gap: 2 }}>
      <Avatar
        alt="User avatar"
        sx={{ width: 40, height: 40 }}
        // src={`${API_USER_AVATAR_URL}/${comment.user_avatar}`}
      />
      <Box
        sx={{
          p: 1.5,
          width: '100%',
          backgroundColor: (theme) =>
            isOwner ? theme.palette.grey[800] : theme.palette.background.paper,
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            {'Ben'} {'Benovich'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">{new Date(123421432324).toLocaleDateString()}</Typography>
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-word' }}>
          Ben send something
        </Typography>
      </Box>
    </Box>
  )
}

export default observer(Comment)
