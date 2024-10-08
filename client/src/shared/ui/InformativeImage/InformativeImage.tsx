import { observer } from 'mobx-react-lite'
import { Avatar, Skeleton, Stack, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

interface Props {
  imgUrl: string
  PrimaryText: JSX.Element | string
  imgPlaceholder?: string
  SecondaryText?: JSX.Element | string
  size?: 'large' | 'medium'
  PrimaryVariant?: Variant
  SecondaryVariant?: Variant
  isLoaded?: boolean
  onClick?: () => void
}

function InformativeImage({
  imgUrl,
  imgPlaceholder,
  PrimaryText,
  SecondaryText,
  size = 'medium',
  PrimaryVariant = 'body2',
  SecondaryVariant = 'subtitle2',
  isLoaded = true,
  onClick
}: Props) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      {isLoaded ? (
        <Avatar
          onClick={onClick}
          alt="Image"
          sx={{
            cursor: onClick? 'pointer' : 'default',
            width: size === 'large' ? 64 : 40,
            height: size === 'large' ? 64 : 40
          }}
          src={imgUrl}
        >
          {imgPlaceholder}
        </Avatar>
      ) : (
        <Skeleton
          variant="circular"
          width={size === 'large' ? 64 : 40}
          height={size === 'large' ? 64 : 40}
        />
      )}
      <Stack>
        <Typography
          onClick={onClick}
          sx={{
            cursor: onClick? 'pointer' : 'default'
          }}
          variant={PrimaryVariant}
        >
          {isLoaded ? PrimaryText : <Skeleton width={120} />}
        </Typography>
        {SecondaryText && (
          <Typography variant={SecondaryVariant} color="textSecondary">
            {isLoaded ? SecondaryText : <Skeleton width={70} />}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default observer(InformativeImage)
