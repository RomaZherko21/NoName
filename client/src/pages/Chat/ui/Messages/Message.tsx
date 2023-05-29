import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Paper, Typography } from '@mui/material'

import { useRootStore } from 'stores'
import { toggleThemeContext } from 'app/theme'
import { fromTimestampToDate } from 'shared/helpers'
import { Message as TMessage } from 'shared/types'
import { API_USER_AVATAR_URL } from 'shared/consts'

interface Props {
  message: TMessage
}

function Message({ message }: Props) {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const { isDefaultTheme } = useContext(toggleThemeContext)

  const isCurrentUser = user.id === message.user.id

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        gap: 1
      }}
    >
      {!isCurrentUser && (
        <Avatar
          src={`${API_USER_AVATAR_URL}/${message.user.avatar}`}
          sx={{ width: 40, height: 40 }}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            px: 2,
            gap: 1,
            maxWidth: 400,
            wordWrap: 'break-word',
            backgroundColor: isDefaultTheme
              ? isCurrentUser
                ? 'primary.light'
                : 'background.paper'
              : isCurrentUser
              ? 'primary.dark'
              : 'background.paper'
          }}
        >
          <Typography variant="subtitle2">
            {isCurrentUser ? t('user:me') : `${message.user.name} ${message.user.surname}`}
          </Typography>
          <Typography variant="body2">{message.text}</Typography>
        </Paper>

        <Typography
          sx={isCurrentUser ? { mr: 2, mt: 0.25, alignSelf: 'flex-end' } : { ml: 2, mt: 0.25 }}
          variant="caption"
          color={isDefaultTheme ? 'grey.600' : 'text.secondary'}
        >
          {fromTimestampToDate(message.created_at)}
        </Typography>
      </Box>
      {isCurrentUser && (
        <Avatar src={`${API_USER_AVATAR_URL}/${user.avatar.url}`} sx={{ width: 40, height: 40 }} />
      )}
    </Box>
  )
}

export default observer(Message)
