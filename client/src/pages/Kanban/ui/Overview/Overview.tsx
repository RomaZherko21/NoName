import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, Typography, Avatar, Chip, Stack, AvatarGroup } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

import { Input } from 'shared/ui'
import primerImg from 'shared/assets/images/cover.jpg'
import { API_USER_AVATAR_URL } from 'shared/consts'

import s from './Styles.module.scss'
import { KanbanModel } from 'pages/Kanban/model'

function Overview({ task }) {
  const { t } = useTranslation()

  return (
    <Stack
      sx={{
        gap: 2,
        p: '24px',
        pt: 0
      }}
    >
      <Box sx={{ display: 'flex', height: 64 }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('fields.createdBy')}
          </Typography>
        </Box>
        <Avatar sx={{ width: 40, height: 40 }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', height: 64 }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('fields.assignedTo')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AvatarGroup>
            {task?.assigne_to?.slice(0, 3)?.map((user_img, id) => (
              <Avatar
                key={id}
                sx={{ width: 32, height: 32 }}
                src={`${API_USER_AVATAR_URL}/${user_img}`}
              ></Avatar>
            ))}
          </AvatarGroup>
          {/* <Avatar sx={{ width: 40, height: 40 }} /> */}
          <IconButton size="small">
            <AiOutlinePlus />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', height: 64 }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('kanban:attachments')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img alt="primerImg" src={primerImg} className={s.attachmentImg} />
          <IconButton size="small">
            <AiOutlinePlus />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', height: 64 }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('kanban:dueDate')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Chip
            sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}
            label={KanbanModel.task?.due_date}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', height: 64 }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('fields.tags')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            onDelete={() => {
              console.log('Delete')
            }}
            label="Business"
            sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}
          />
          <IconButton size="small">
            <AiOutlinePlus />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ width: 160 }}>
          <Typography variant="caption" color="text.secondary">
            {t('fields.description')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Input placeholder={t('actions.leaveMessage')} multiline rows={6} sx={{ width: 300 }} />
        </Box>
      </Box>
    </Stack>
  )
}

export default observer(Overview)
