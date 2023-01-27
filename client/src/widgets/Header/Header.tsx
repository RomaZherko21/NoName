import { observer } from 'mobx-react-lite'
import { AppBar, Toolbar, Box } from '@mui/material'

import { DRAWER_WIDTH } from 'shared/consts'

import { ProfileMenuPopover, ChangeLangPopup, NotificationsPopover, ContactsPopover } from './ui'

function Header() {
  return (
    <AppBar
      sx={{
        backgroundColor: 'rgba(14, 19, 32, 0.8)',
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
      }}
      position="fixed"
    >
      <Toolbar disableGutters sx={{ px: 2, py: 0, justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
          <ChangeLangPopup />
          <NotificationsPopover />
          <ContactsPopover />
          <ProfileMenuPopover />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
