import React from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, Paper, Typography } from '@mui/material'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'

interface Props {
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>
  // message: Message
}

function Message({ messagesEndRef }: Props) {
  const { user } = useRootStore()
  const isCurrentUser = true

  return (
    <Box
      ref={messagesEndRef}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        gap: 1,
      }}
    >
      {!isCurrentUser && <Avatar sx={{ width: '32px', height: '32px' }} />}
      <Box sx={isCurrentUser ? { display: 'flex', flexDirection: 'column' } : {}}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '0.5rem 1rem',
            gap: 1,
            maxWidth: '450px',
            wordWrap: 'break-word',
            backgroundColor: (theme) => (isCurrentUser ? theme.palette.primary.dark : ''),
          }}
        >
          <Typography variant="subtitle2">{isCurrentUser ? 'Me' : 'Miron Vitold'}</Typography>
          <Typography variant="body1">
            Hey, nice projects! I really liked the one in react. What's your quote on kinda similar
            project?
          </Typography>
        </Paper>
        <Typography sx={{ ml: 2, mt: 1 }} variant="caption" color="text.secondary">
          4 days ago
        </Typography>
      </Box>
      {isCurrentUser && (
        <Avatar
          src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          sx={{ width: '32px', height: '32px' }}
        />
      )}
    </Box>
  )
}

export default observer(Message)
