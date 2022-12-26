import { Avatar } from '@mui/material'
import HideImageIcon from '@mui/icons-material/HideImage'

interface Props {
  src: string
  sx?: any
}

const ImageAvatar = ({ src, sx }: Props) => (
  <Avatar src={src} sx={sx}>
    <HideImageIcon />
  </Avatar>
)

export default ImageAvatar
