import { useTranslation } from 'react-i18next'
import { Box, Drawer, Divider, IconButton, Typography, Grid, Avatar, Chip } from '@mui/material'
import { AiOutlineClose, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'

import { File } from 'shared/types/file'

import { FilesModel } from 'pages/FileManager/model'

import folder from 'shared/assets/images/fileFormat/folder.svg'

interface Props {
  file: File
  openFileInfo: boolean
  onCloseFileInfo: () => void
  toggleFavourite: (id: number) => void
  deleteFile: (id: number) => void
  deleteTag: (id: number) => void
}

const AsideFileInfo = ({
  file,
  openFileInfo,
  onCloseFileInfo,
  toggleFavourite,
  deleteFile,
  deleteTag,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Drawer
      anchor="right"
      open={openFileInfo}
      onClose={onCloseFileInfo}
      PaperProps={{
        sx: {
          width: 350,
          position: 'fixed',
          overflow: 'hidden',
          border: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, px: 3, py: 2 }}>
        <IconButton
          onClick={() => toggleFavourite(file.id)}
          sx={{
            p: 1,
            fontSize: 20,
            color: (theme) =>
              file.is_favourite ? theme.palette.warning.main : theme.palette.grey[500],
          }}
        >
          <AiOutlineStar />
        </IconButton>
        <IconButton
          onClick={onCloseFileInfo}
          sx={{ p: 1, fontSize: 20, color: (theme) => theme.palette.grey[500] }}
        >
          <AiOutlineClose />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2,
            mb: 2,
            color: (theme) => theme.palette.grey[500],
            backgroundColor: '#1c2536',
            borderRadius: 1,
            borderStyle: 'dashed',
            borderWidth: 1,
          }}
        >
          <img alt="Folder" src={folder} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{file.name}</Typography>
          <IconButton size="small">
            <MdOutlineEdit />
          </IconButton>
        </Box>

        <Grid container>
          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('file:createdBy')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ p: 1.5 }}>
            <Avatar></Avatar>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('file:size')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ p: 1.5 }}>
            <Typography variant="body2">{file.size}</Typography>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('fields.createdAt')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ p: 1.5 }}>
            <Typography variant="body2">{file.created_at}</Typography>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('file:modifiedAt')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ p: 1.5 }}>
            <Typography variant="body2"></Typography>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('file:tags')}</Typography>
          </Grid>
          <Grid
            xs={8}
            sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', p: 1.5 }}
          >
            {FilesModel.files.map((file) =>
              file.tags.map((tag, id) => (
                <Chip
                  label={tag}
                  onDelete={() => deleteTag(id)}
                  sx={{ height: 26, backgroundColor: (theme) => theme.palette.grey[700] }}
                />
              ))
            )}
            <IconButton sx={{ fontSize: 20, color: (theme) => theme.palette.grey[500] }}>
              <AiOutlinePlus />
            </IconButton>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('file:sharedWith')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ display: 'flex', p: 1.5 }}>
            <Avatar></Avatar>
            <IconButton sx={{ fontSize: 20, ml: 1, color: (theme) => theme.palette.grey[500] }}>
              <AiOutlinePlus />
            </IconButton>
          </Grid>

          <Grid xs={4} sx={{ p: 1.5 }}>
            <Typography variant="caption">{t('translation:common.actions')}</Typography>
          </Grid>
          <Grid xs={8} sx={{ p: 1.5 }}>
            <IconButton
              onClick={() => deleteFile(file.id)}
              sx={{ fontSize: 18, color: (theme) => theme.palette.grey[500] }}
            >
              <FiTrash />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  )
}

export default AsideFileInfo
