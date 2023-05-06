import { useTranslation } from 'react-i18next'
import { Box, Drawer, Divider, IconButton, Typography, Grid, Avatar } from '@mui/material'
import { AiOutlineClose, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'

// import { FilesModel } from 'pages/FileManager/model'
import folder from 'shared/assets/images/fileFormat/folder.svg'
import { fromTimestampToDate } from 'shared/helpers'

interface Props {
  openFileInfo: boolean
  onCloseFileInfo: () => void
}

const AsideFileInfo = ({ openFileInfo, onCloseFileInfo }: Props) => {
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
          border: 'none'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          px: 3,
          py: 2
        }}
      >
        <IconButton
          sx={{
            p: 1,
            fontSize: 20
            // color: ({ palette }) => (file.is_favourite ? palette.warning.main : palette.grey[500])
          }}
        >
          <AiOutlineStar />
        </IconButton>
        <IconButton
          onClick={onCloseFileInfo}
          sx={{ p: 1, fontSize: 20, color: ({ palette }) => palette.grey[500] }}
        >
          <AiOutlineClose />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            mb: 2,
            borderColor: ({ palette }) => palette.grey[500],
            borderRadius: 1,
            borderStyle: 'dashed',
            borderWidth: 1
          }}
        >
          <img alt="Folder" src={folder} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h5">'file.name'</Typography>
          <IconButton size="small">
            <MdOutlineEdit />
          </IconButton>
        </Box>

        <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('file:createdBy')}</Typography>
            </Grid>
            <Grid xs={8}>
              <Avatar sx={{ width: 28, height: 28 }}></Avatar>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('file:size')}</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography variant="body2">2000</Typography>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('fields.createdAt')}</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography variant="body2">{fromTimestampToDate('2017-01-01 10:40:01')}</Typography>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('file:modifiedAt')}</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography variant="body2"></Typography>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('file:tags')}</Typography>
            </Grid>
            <Grid
              xs={8}
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              {/* {FilesModel.files.map((file) =>
                file.tags.map((tag, id) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => {
                      deleteTag(id)
                    }}
                    sx={{
                      height: 26,
                      backgroundColor: ({ palette }) => palette.grey[700]
                    }}
                  />
                ))
              )} */}
              <IconButton sx={{ fontSize: 16, color: ({ palette }) => palette.grey[500] }}>
                <AiOutlinePlus />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('file:sharedWith')}</Typography>
            </Grid>
            <Grid xs={8} sx={{ display: 'flex' }}>
              <Avatar sx={{ width: 28, height: 28 }}></Avatar>
              <IconButton
                sx={{
                  fontSize: 16,
                  ml: 1,
                  color: ({ palette }) => palette.grey[500]
                }}
              >
                <AiOutlinePlus />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid xs={4}>
              <Typography variant="caption">{t('translation:common.actions')}</Typography>
            </Grid>
            <Grid xs={8}>
              <IconButton
                onClick={() => {
                  // deleteFile(file.id)
                }}
                sx={{ fontSize: 16, color: ({ palette }) => palette.grey[500] }}
              >
                <FiTrash />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  )
}

export default AsideFileInfo
