import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Box, Grid, IconButton, Paper, Typography, AvatarGroup, Avatar } from '@mui/material'
import { AiOutlineStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

import { File } from 'shared/types/file'
import { CircleDevider, PopupMenu } from 'shared/ui'

import { getFilePopupConfig } from '../FilePopupConfig'
import folder from 'assets/images/folder.svg'

interface Props {
  file: File
  toggleFavourite: (id: number) => void
}

const FileItemRow = ({ file, toggleFavourite }: Props) => {
  const { t } = useTranslation()
  const popupConfig = useMemo(() => getFilePopupConfig(file.id), [file.id])

  return (
    <Grid
      component={Paper}
      xs={12}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        background: 'none',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <img alt="Folder" src={folder} />
        <Box>
          <Typography variant="body2">{file.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {file.size} <CircleDevider sx={{ backgroundColor: 'text.secondary', m: 0 }} />{' '}
            {file.count} items
          </Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="body2" color="text.primary">
          {t('file:createdAt')}
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
            width: '36px',
            height: '36px',
            color: (theme) =>
              file.is_favourite ? theme.palette.warning.main : theme.palette.action.active,
          }}
        >
          <AiOutlineStar />
        </IconButton>
        <PopupMenu
          ActionButton={(btnProps) => (
            <IconButton {...btnProps} aria-label="settings" sx={{ width: '36px', height: '36px' }}>
              <FiMoreVertical />
            </IconButton>
          )}
          config={popupConfig}
        />
      </Box>
    </Grid>
  )
}

export default FileItemRow
