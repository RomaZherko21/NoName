import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Box, IconButton, Paper, Typography, AvatarGroup, Avatar } from '@mui/material'
import { AiOutlineStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

import { Folder } from 'shared/types/file'
import { CircleDevider, PopupMenu } from 'shared/ui'
import { fromTimestampToDate } from 'shared/helpers'
import folderImg from 'shared/assets/images/fileFormat/folder.svg'

import { getFilePopupConfig } from '../FilePopupConfig'
import { API_USER_AVATAR_URL, MB } from 'shared/consts'

interface Props {
  folder: Folder
  toggleFavourite: (id: number) => void
  handleOpenFileInfo: () => void
}

const FileItemRow = ({ folder, handleOpenFileInfo }: Props) => {
  const { t } = useTranslation()
  const popupConfig = useMemo(() => getFilePopupConfig(folder.name), [folder.name])

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
        transition: 'ease 0.3s',
        '&:hover': {
          backgroundColor: ({ palette }) => palette.background.paper,
          boxShadow: '0 14px 28px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '200px' }}>
        <Box sx={{ cursor: 'pointer' }} onClick={handleOpenFileInfo}>
          <img alt="Folder" src={folderImg} />
        </Box>

        <Box>
          <Typography variant="body2" onClick={handleOpenFileInfo} sx={{ cursor: 'pointer' }}>
            {folder.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            {Number(folder.memory_used) / MB} MB
            <CircleDevider sx={{ backgroundColor: 'text.secondary', m: 0 }} />{' '}
            {t('file:fileItems', { count: folder.files_count })}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '150px' }}>
        <Typography variant="body2" color="text.primary">
          {t('fields.createdAt')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {fromTimestampToDate(folder.created_at)}
        </Typography>
      </Box>

      <AvatarGroup sx={{ width: '150px', justifyContent: 'center' }}>
        {folder.assignee_to?.slice(0, 3)?.map((item) => (
          <Avatar sx={{ width: 32, height: 32 }} src={`${API_USER_AVATAR_URL}/${item}`}></Avatar>
        ))}
      </AvatarGroup>

      <Box sx={{ display: 'flex', gap: 4, width: '100px', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            // toggleFavourite(file.id)
          }}
          sx={{
            width: 36,
            height: 36
            // color: ({ palette }) =>
            //   file.is_favourite ? palette.warning.main : palette.action.active
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
