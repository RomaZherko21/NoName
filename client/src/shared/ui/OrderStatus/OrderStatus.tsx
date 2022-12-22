import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Typography, useTheme } from '@mui/material'

interface Props {
  status?: number
}

function OrderStatus({ status }: Props) {
  const { t } = useTranslation()

  let color
  let title

  switch (status) {
    case 0:
      color = 'warning'
      title = {t('notification:status.pending')}
      break
    case 1:
      color = 'success'
      title = {t('notification:status.approved')}
      break
    case 2:
      color = 'error'
      title = {t('notification:status.rejected')}
      break
    default:
      color = 'primary'
      title = {t('notification:status.none')}
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  )
}

function Dot({ color, size }: { color: string; size?: number }) {
  const theme = useTheme()

  let main
  switch (color) {
    case 'secondary':
      main = theme.palette.secondary.main
      break
    case 'error':
      main = theme.palette.error.main
      break
    case 'warning':
      main = theme.palette.warning.main
      break
    case 'info':
      main = theme.palette.info.main
      break
    case 'success':
      main = theme.palette.success.main
      break
    case 'primary':
    default:
      main = theme.palette.primary.main
  }

  return (
    <Box
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: main,
      }}
    />
  )
}

export default observer(OrderStatus)
