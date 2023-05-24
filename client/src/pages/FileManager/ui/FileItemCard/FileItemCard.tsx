import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Box, IconButton, Paper, Typography, Divider, AvatarGroup, Avatar } from '@mui/material'
import { AiOutlineStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'

import { Folder } from 'shared/types/file'
import { CircleDevider, PopupMenu } from 'shared/ui'
import folderImg from 'shared/assets/images/fileFormat/folder.svg'
import { fromTimestampToDate } from 'shared/helpers'

import { getFilePopupConfig } from '../FilePopupConfig'
import { API_USER_AVATAR_URL, MB } from 'shared/consts'
import { FilesModel } from 'pages/FileManager/model'

interface Props {
  folder: Folder
  toggleFavourite: (id: number) => void
  handleOpenFileInfo: () => void
}

const FileItem = ({ folder, handleOpenFileInfo }: Props) => {
  const { t } = useTranslation()
  const popupConfig = useMemo(() => getFilePopupConfig(folder.name), [folder.name])

  function onAsideOpenHandler() {
    handleOpenFileInfo()
    FilesModel.fetchFolder({ id: folder.id })
  }

  return (
    <Paper
      variant="outlined"
      sx={{
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <IconButton
          onClick={() => {
            // toggleFavourite(file.id)
          }}
          sx={{
            width: 36,
            height: 36
            // color: ({ palette }) =>
            //   folder.is_favourite ? palette.warning.main : palette.action.active
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

      <Box sx={{ cursor: 'pointer' }} onClick={onAsideOpenHandler}>
        <img alt="Folder" src={folderImg} />
      </Box>

      <Typography variant="body2" onClick={onAsideOpenHandler} sx={{ cursor: 'pointer' }}>
        {folder.name}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          {Number(folder.memory_used) / MB} MB
          <CircleDevider sx={{ backgroundColor: 'text.secondary', m: 0 }} />{' '}
          {t('file:fileItems', { count: folder.files_count })}
        </Typography>
        <AvatarGroup>
          {folder.assignee_to?.slice(0, 3)?.map((item) => (
            <Avatar sx={{ width: 32, height: 32 }} src={`${API_USER_AVATAR_URL}/${item}`}></Avatar>
          ))}
        </AvatarGroup>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {t('file:createdAt', { date: fromTimestampToDate(folder.created_at) })}
      </Typography>
    </Paper>
  )
}

export default FileItem
