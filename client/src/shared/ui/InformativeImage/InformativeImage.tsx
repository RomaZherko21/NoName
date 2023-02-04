import { observer } from 'mobx-react-lite'
import { Avatar, Stack, Typography } from '@mui/material'

interface Props {
  imgUrl: string
  PrimaryText: JSX.Element | string
  imgPlaceholder?: string
  SecondaryText?: JSX.Element | string
  size?: 'large' | 'medium'
  PrimaryTextVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
  SecondaryTextVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
}

function InformativeImage({
  imgUrl,
  imgPlaceholder,
  PrimaryText,
  SecondaryText,
  size = 'medium',
  PrimaryTextVariant = 'body2',
  SecondaryTextVariant = 'subtitle2',
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
        <Typography variant={PrimaryTextVariant}>{PrimaryText}</Typography>
        {SecondaryText && (
          <Typography variant={SecondaryTextVariant} color="textSecondary">
            {SecondaryText}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default observer(InformativeImage)
