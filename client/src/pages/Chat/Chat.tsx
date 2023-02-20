import { observer } from 'mobx-react-lite'
import { Box, Stack } from '@mui/material'

import { AsideChatSelector, Header, LeaveMessage, Messages } from './ui'

function Chat() {
  return (
    <Box
      sx={{
        display: 'flex',
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        height: 'calc(100vh - 64px)',
      }}
    >
      <AsideChatSelector />

      <Stack sx={{ width: '100%' }}>
        <Header user={{ name: 'qw', surname: 'www', online: 999999, avatar: '22' }} />
        <Messages />
        <LeaveMessage />
      </Stack>
    </Box>
  )
}

export default observer(Chat)
