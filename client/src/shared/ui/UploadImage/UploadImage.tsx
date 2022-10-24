import { observer } from 'mobx-react-lite'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar } from '@mui/material'

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
        <EditIcon className={s.editIcon} />
      </div>
    </label>
  )
}

export default observer(UploadImage)
