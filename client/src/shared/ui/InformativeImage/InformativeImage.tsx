import { observer } from 'mobx-react-lite'
import { Avatar, Stack, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

interface Props {
  imgUrl: string
  PrimaryText: JSX.Element | string
  imgPlaceholder?: string
  SecondaryText?: JSX.Element | string
  size?: 'large' | 'medium'
  PrimaryVariant?: Variant
  SecondaryVariant?: Variant
}

function InformativeImage({
  imgUrl,
  imgPlaceholder,
  PrimaryText,
  SecondaryText,
  size = 'medium',
  PrimaryVariant = 'body2',
  SecondaryVariant = 'subtitle2',
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
        <Typography variant={PrimaryVariant}>{PrimaryText}</Typography>
        {SecondaryText && (
          <Typography variant={SecondaryVariant} color="textSecondary">
            {SecondaryText}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default observer(InformativeImage)
