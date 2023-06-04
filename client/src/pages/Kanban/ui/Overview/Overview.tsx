import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, Typography, Avatar, Chip, Stack, AvatarGroup } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

import { Input, Spinner } from 'shared/ui'
import { API_KANBAN_IMAGES_URL, API_USER_AVATAR_URL } from 'shared/consts'
import { KanbanModel } from 'pages/Kanban/model'
import { fromTimestampToDate } from 'shared/helpers'

import s from './Styles.module.scss'

function Overview() {
  const { t } = useTranslation()

  return (
    <Stack
      sx={{
        gap: 2,
        p: 4,
        pt: 0
      }}
    >
      {KanbanModel.loadingAside.has ? (
        <Spinner />
      ) : (
        <>
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
                {KanbanModel.task?.assigne_to.slice(0, 3).map((user_img, id) => (
                  <Avatar
                    key={id}
                    sx={{ width: 32, height: 32 }}
                    src={`${API_USER_AVATAR_URL}/${user_img}`}
                  ></Avatar>
                ))}
              </AvatarGroup>
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

            {KanbanModel.task?.attachments && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                  alt="primerImg"
                  src={`${API_KANBAN_IMAGES_URL}/${KanbanModel.task?.attachments[0]}`}
                  className={s.attachmentImg}
                />
                <IconButton size="small">
                  <AiOutlinePlus />
                </IconButton>
              </Box>
            )}

            {!KanbanModel.task?.attachments && (
              <IconButton size="small">
                <AiOutlinePlus />
              </IconButton>
            )}
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
                label={fromTimestampToDate(KanbanModel.task?.due_date)}
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
              {KanbanModel.task?.tags.map((tag, id) => (
                <>
                  {tag && (
                    <Chip
                      key={id}
                      onDelete={() => {
                        console.log('Delete')
                      }}
                      label={tag}
                      sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}
                    />
                  )}
                </>
              ))}

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
              <Input
                placeholder={t('actions.leaveMessage')}
                multiline
                rows={6}
                sx={{ width: 300 }}
                value={KanbanModel.task?.description}
              />
            </Box>
          </Box>
        </>
      )}
    </Stack>
  )
}

export default observer(Overview)
