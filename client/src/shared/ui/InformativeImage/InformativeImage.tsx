import { observer } from 'mobx-react-lite'
import { Avatar, Stack, Typography } from '@mui/material'

interface Props {
  imgUrl: string
  PrimaryText: JSX.Element | string
  imgPlaceholder?: string
  SecondaryText?: JSX.Element | string
  size?: 'large' | 'medium'
}

function InformativeImage({
  imgUrl,
  imgPlaceholder,
  PrimaryText,
  SecondaryText,
  size = 'medium',
}: Props) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Avatar
        alt="Image"
        sx={{
          cursor: 'pointer',
          width: size === 'large' ? 64 : 40,
          height: size === 'large' ? 64 : 40,
        }}
        src={imgUrl}
      >
        {imgPlaceholder}
      </Avatar>
      <Stack>
        <Typography variant="body2">{PrimaryText}</Typography>
        {SecondaryText && (
          <Typography variant="subtitle2" color="textSecondary">
            {SecondaryText}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default observer(InformativeImage)
