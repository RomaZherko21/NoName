import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import { format } from 'date-fns'

import { useRootStore } from 'stores'
import { fromMsToDate } from 'shared/helpers'
import { Message as Messagee } from 'shared/types'
import { API_USER_AVATAR_URL, COMMON_DATE_FORMAT } from 'shared/consts'

interface Props {
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>
  message: Messagee
}

function Message({ messagesEndRef, message }: Props) {
  const { user } = useRootStore()
  const { t } = useTranslation()

  return (
    <Box
      ref={messagesEndRef}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: message.isCurrentUser ? 'flex-end' : 'flex-start',
        gap: 1,
      }}
    >
      {!message.isCurrentUser && <Avatar sx={{ width: '32px', height: '32px' }} />}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '0.5rem 1rem',
            gap: 1,
            maxWidth: '450px',
            wordWrap: 'break-word',
            backgroundColor: (theme) => (message.isCurrentUser ? theme.palette.primary.dark : ''),
          }}
        >
          <Typography variant="subtitle2">
            {message.isCurrentUser ? t('user:me') : `${message.user_name} ${message.user_surname}`}
          </Typography>
          <Typography variant="body1">{message.message}</Typography>
        </Paper>
        <Typography
          sx={message.isCurrentUser ? { mr: 2, mt: 1, alignSelf: 'flex-end' } : { ml: 2, mt: 1 }}
          variant="caption"
          color="text.secondary"
        >
          {format(fromMsToDate(message.received_at), COMMON_DATE_FORMAT)}
        </Typography>
      </Box>
      {message.isCurrentUser && (
        <Avatar
          src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          sx={{ width: '32px', height: '32px' }}
        />
      )}
    </Box>
  )
}

export default observer(Message)
