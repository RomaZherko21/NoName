import { useRef, useEffect } from 'react'
import { Paper, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import conversationNotFound from 'assets/images/404.png'

import s from './Styles.module.scss'
import { Message } from './ui'

function Messages() {
  const { t } = useTranslation()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Paper
      className={s.chatBackground}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: `calc(100vh - 202px)`,
        p: 4,
        gap: 2,
        overflowY: 'auto',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
      }}
    >
      <Message messagesEndRef={messagesEndRef} />
    </Paper>
    // <Paper sx={{ width: '100%', height: `calc(100vh - 130px)`, borderRadius: 0 }}>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       flexDirection: 'column',
    //       gap: 1,
    //       height: '100%',
    //     }}
    //   >
    //     <img src={conversationNotFound} alt="Conversation not found" className={s.img} />
    //     <Typography variant="subtitle1" color="text.secondary">
    //       {t('user:conversationHint')}
    //     </Typography>
    //   </Box>
    // </Paper>
  )
}

export default Messages
