import { Avatar } from '@mui/material'
import HideImageIcon from '@mui/icons-material/HideImage'

interface Props {
  src: string
  styles?: any
}

const ImageAvatar = ({ src, styles }: Props) => (
  <Avatar src={src} sx={styles}>
    <HideImageIcon />
  </Avatar>
)

export default ImageAvatar
