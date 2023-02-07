import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Typography } from '@mui/material'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'

import s from './Styles.module.scss'

interface Props {
  handleUploadClick: (event: any) => void
  imageUrl: string
  width?: number
  height?: number
  borderRadius?: string
}

const UploadImage = ({
  handleUploadClick,
  imageUrl,
  width = 100,
  height = 100,
  borderRadius = '50%',
}: Props) => {
  const { t } = useTranslation()

  return (
    <label htmlFor="upload-file">
      <input
        id="upload-file"
        name="avatar"
        type="file"
        accept="image/*"
        onChange={handleUploadClick}
        style={{ display: 'none' }}
      />
      <div className={s.avatar}>
        <Avatar
          style={{ cursor: 'pointer' }}
          alt="Upload"
          src={imageUrl}
          sx={{ width, height, borderRadius }}
        />
        <Box className={s.cameraIcon}>
          <PhotoCameraOutlinedIcon />
          <Typography variant="subtitle2">{t('actions.select')}</Typography>
        </Box>
      </div>
    </label>
  )
}

export default observer(UploadImage)
