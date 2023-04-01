import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, Typography, Avatar, Chip, Stack } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

import { Input } from 'shared/ui'
import primerImg from 'shared/assets/images/cover.jpg'

import s from './Styles.module.scss'

function Overview() {
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
          <Avatar sx={{ width: 40, height: 40 }} />
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
          <Chip sx={{ backgroundColor: (theme) => theme.palette.grey[800] }} label="Mar 09, 2023" />
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
