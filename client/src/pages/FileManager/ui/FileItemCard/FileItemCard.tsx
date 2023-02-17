import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Box, IconButton, Paper, Typography, Divider, AvatarGroup, Avatar } from '@mui/material'
import { AiOutlineStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

import { File } from 'shared/types/file'
import { CircleDevider, PopupMenu } from 'shared/ui'
import folder from 'shared/assets/images/fileFormat/folder.svg'

import { getFilePopupConfig } from '../FilePopupConfig'

interface Props {
  file: File
  toggleFavourite: (id: number) => void
}

const FileItem = ({ file, toggleFavourite }: Props) => {
  const { t } = useTranslation()

  const popupConfig = useMemo(() => getFilePopupConfig(file.id), [file.id])

  return (
    <Paper variant="outlined" sx={{ p: 2, background: 'none', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <IconButton
          onClick={() => toggleFavourite(file.id)}
          sx={{
            width: 36,
            height: 36,
            color: (theme) =>
              file.is_favourite ? theme.palette.warning.main : theme.palette.action.active,
          }}
        >
          <AiOutlineStar />
        </IconButton>

        <PopupMenu
          ActionButton={(btnProps) => (
            <IconButton {...btnProps} aria-label="settings" sx={{ width: 36, height: 36 }}>
              <FiMoreVertical />
            </IconButton>
          )}
          config={popupConfig}
        />
      </Box>

      <img alt="Folder" src={folder} />

      <Typography variant="body2">{file.name}</Typography>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          {file.size}
          <CircleDevider sx={{ backgroundColor: 'text.secondary', m: 0 }} />{' '}
          {t('file:fileItems', { count: file.count })}
        </Typography>
        <AvatarGroup>
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </AvatarGroup>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {t('file:createdAt', { date: file.created_at })}
      </Typography>
    </Paper>
  )
}

export default FileItem
