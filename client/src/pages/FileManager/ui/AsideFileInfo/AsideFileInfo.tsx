import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Grid,
  Avatar,
  AvatarGroup,
  Chip
} from '@mui/material'
import { AiOutlineClose, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'

import { FiTrash } from 'react-icons/fi'

import { FilesModel } from 'pages/FileManager/model'
import folderImg from 'shared/assets/images/fileFormat/folder.svg'
import { fromTimestampToDate } from 'shared/helpers'
import { EditableInput, PopupMenu, Spinner } from 'shared/ui'
import { API_USER_AVATAR_URL, MB } from 'shared/consts'
import { useMemo } from 'react'
import { getTagsPopupConfig } from '../TagsPopupConfig'

interface Props {
  openFileInfo: boolean
  onCloseFileInfo: () => void
}

const AsideFileInfo = ({ openFileInfo, onCloseFileInfo }: Props) => {
  const { t } = useTranslation()

  const popupConfig = useMemo(() => getTagsPopupConfig(), [])

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
          <img alt="Folder" src={folderImg} />
        </Box>
        {FilesModel.loading.has ? (
          <Spinner />
        ) : (
          <>
            <EditableInput
              value={FilesModel.folder?.name || ''}
              onSave={(value: string) => {
                FilesModel.editFolderName(value)
              }}
            />

            <Box>{FilesModel.folder?.name}</Box>

            <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid container xs={12}>
                <Grid xs={4}>
                  <Typography variant="caption">{t('file:createdBy')}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    src={`${API_USER_AVATAR_URL}/${FilesModel.folder?.created_by}`}
                  ></Avatar>
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={4}>
                  <Typography variant="caption">{t('file:size')}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body2">
                    {Number(FilesModel.folder?.memory_used) / MB} MB
                  </Typography>
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={4}>
                  <Typography variant="caption">{t('fields.createdAt')}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body2">
                    {fromTimestampToDate(FilesModel.folder?.created_at)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={4}>
                  <Typography variant="caption">{t('file:modifiedAt')}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body2">
                    {fromTimestampToDate(FilesModel.folder?.updated_at)}
                  </Typography>
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
                  {FilesModel.folder?.tags?.map((tag) => (
                    <Chip
                      key={tag.name}
                      label={tag.name}
                      onDelete={() => {
                        if (FilesModel.folder?.id)
                          FilesModel.deleteTag(FilesModel.folder.id, tag.id)
                      }}
                      sx={{
                        height: 26,
                        backgroundColor: ({ palette }) => palette.grey[700]
                      }}
                    />
                  ))}
                  <PopupMenu
                    ActionButton={(btnProps) => (
                      <IconButton
                        {...btnProps}
                        sx={{ fontSize: 16, color: ({ palette }) => palette.grey[500] }}
                      >
                        <AiOutlinePlus
                        // onClick={() => {
                        //   FilesModel.createTag('tag: string')
                        // }}
                        />
                      </IconButton>
                    )}
                    config={popupConfig}
                  />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={4}>
                  <Typography variant="caption">{t('file:sharedWith')}</Typography>
                </Grid>
                <Grid xs={8} sx={{ display: 'flex' }}>
                  <AvatarGroup>
                    {FilesModel.folder?.assignee_to?.map((item) => (
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={`${API_USER_AVATAR_URL}/${item}`}
                      ></Avatar>
                    ))}
                  </AvatarGroup>
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
                      // FilesModel.deleteFolder(id)
                    }}
                    sx={{ fontSize: 16, color: ({ palette }) => palette.grey[500] }}
                  >
                    <FiTrash />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default observer(AsideFileInfo)
