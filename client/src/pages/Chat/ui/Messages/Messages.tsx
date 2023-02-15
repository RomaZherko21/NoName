import { useRef, useEffect } from 'react'
import { Paper, Box, Typography, Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'
import conversationNotFound from 'assets/images/404.png'
import userImg from 'assets/images/cover.jpg'

import s from './Styles.module.scss'

function Messages() {
  const { t } = useTranslation()
  const { user } = useRootStore()
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
        borderRadius: 0,
        p: 4,
        overflowY: 'auto',
        gap: 2,
      }}
    >
      <Box ref={messagesEndRef} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Avatar sx={{ width: '32px', height: '32px' }} />
        <Box>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0.5rem 1rem',
              gap: 1,
              maxWidth: '450px',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="subtitle2"> Miron Vitold</Typography>
            <Typography variant="body1">
              Hey, nice projects! I really liked the one in react. What's your quote on kinda
              similar project?
            </Typography>
          </Paper>
          <Typography sx={{ ml: 2, mt: 1 }} variant="caption" color="text.secondary">
            4 days ago
          </Typography>
        </Box>
      </Box>

      <Box
        ref={messagesEndRef}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 1 }}
      >
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
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <Typography variant="subtitle2"> Me</Typography>
            <Typography variant="body1">
              I would need to know more details, but my hourly rate stats at $35/hour. Thanks!
            </Typography>
          </Paper>
          <Typography
            sx={{ alignSelf: 'end', mr: 2, mt: 1 }}
            variant="caption"
            color="text.secondary"
          >
            4 days ago
          </Typography>
        </Box>
        <Avatar
          src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          sx={{ width: '32px', height: '32px' }}
        />
      </Box>

      <Box ref={messagesEndRef} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Avatar sx={{ width: '32px', height: '32px' }} />
        <Box>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0.5rem 1rem',
              gap: 1,
              maxWidth: '450px',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="subtitle2"> Miron Vitold</Typography>
            <Typography variant="body1">
              Well it's a really easy one, I'm sure we can make it half of the price.
            </Typography>
          </Paper>
          <Typography sx={{ ml: 2, mt: 1 }} variant="caption" color="text.secondary">
            5 hours ago
          </Typography>
        </Box>
      </Box>

      <Box
        ref={messagesEndRef}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 1 }}
      >
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
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <Typography variant="subtitle2"> Me</Typography>
            <Typography variant="body1">
              Then why don't you make it if it's that easy? Sorry I'm not interetes, have fantastic
              day Adam!
            </Typography>
          </Paper>
          <Typography
            sx={{ alignSelf: 'end', mr: 2, mt: 1 }}
            variant="caption"
            color="text.secondary"
          >
            3 hours ago
          </Typography>
        </Box>
        <Avatar
          src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          sx={{ width: '32px', height: '32px' }}
        />
      </Box>

      <Box ref={messagesEndRef} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Avatar sx={{ width: '32px', height: '32px' }} />
        <Box>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0.5rem 1rem',
              gap: 1,
              maxWidth: '450px',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="subtitle2"> Miron Vitold</Typography>
            <Typography variant="body1">Last offer, $25 per hour</Typography>
          </Paper>
          <Typography sx={{ ml: 2, mt: 1 }} variant="caption" color="text.secondary">
            2 hours ago
          </Typography>
        </Box>
      </Box>

      <Box ref={messagesEndRef} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Avatar sx={{ width: '32px', height: '32px' }} />
        <Box>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0.5rem 1rem',
              gap: 1,
              maxWidth: '450px',
              wordWrap: 'break-word',
            }}
          >
            <Typography variant="subtitle2"> Miron Vitold</Typography>
            <img src={userImg} className={s.userImg} />
          </Paper>
          <Typography sx={{ ml: 2, mt: 1 }} variant="caption" color="text.secondary">
            2 hours ago
          </Typography>
        </Box>
      </Box>
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
