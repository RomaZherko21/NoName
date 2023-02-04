import { observer } from 'mobx-react-lite'
import { Box, SxProps, Theme } from '@mui/material'

interface Props {
  sx?: SxProps<Theme>
}

function CircleDevider({ sx }: Props) {
  return (
    <Box
      sx={{
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '6px',
        height: '6px',
        backgroundColor: 'text.primary',
        borderRadius: 50,
        m: 1,
        ...sx,
      }}
    />
  )
}

export default observer(CircleDevider)
