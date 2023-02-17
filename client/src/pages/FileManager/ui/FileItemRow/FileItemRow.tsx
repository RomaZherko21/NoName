import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Box, Grid, IconButton, Paper, Typography, AvatarGroup, Avatar } from '@mui/material'
import { AiOutlineStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

import { File } from 'shared/types/file'
import { CircleDevider, PopupMenu } from 'shared/ui'

import { getFilePopupConfig } from '../FilePopupConfig'
import folder from 'shared/assets/images/fileFormat/folder.svg'

interface Props {
  file: File
  toggleFavourite: (id: number) => void
}

const FileItemRow = ({ file, toggleFavourite }: Props) => {
  const { t } = useTranslation()
  const popupConfig = useMemo(() => getFilePopupConfig(file.id), [file.id])

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        background: 'none',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <img alt="Folder" src={folder} />

        <Box>
          <Typography variant="body2">{file.name}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            {file.size}
            <CircleDevider sx={{ backgroundColor: 'text.secondary', m: 0 }} />{' '}
            {t('file:fileItems', { count: file.count })}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="body2" color="text.primary">
          {t('fields.createdAt')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {file.created_at}
        </Typography>
      </Box>

      <AvatarGroup>
        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
      </AvatarGroup>

      <Box sx={{ display: 'flex', gap: 4 }}>
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
    </Paper>
  )
}

export default FileItemRow
