import { useRef, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, Typography } from '@mui/material'

import { toggleThemeContext } from 'app/theme'
import notFound from 'shared/assets/images/404.png'
import background from 'shared/assets/images/chat-background.jpg'
import backgroundLight from 'shared/assets/images/chat-background-light.jpg'

import Message from './Message'
import { ChatModel } from '../../model'

function Messages() {
  const { t } = useTranslation()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const { isDefaultTheme } = useContext(toggleThemeContext)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [])

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 2,
        overflowY: 'auto',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundImage: isDefaultTheme ? `url(${backgroundLight})` : `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {ChatModel.messages.length ? (
        ChatModel.messages.map((message) => <Message key={message.id} message={message} />)
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
            height: '100%'
          }}
        >
          <Avatar
            src={notFound}
            alt="No any messages"
            sx={{ width: 120, height: 120, borderRadius: 0 }}
          />
          <Typography variant="subtitle2" color="text.secondary">
            {t('chat:notification.emptyChat')}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default observer(Messages)
