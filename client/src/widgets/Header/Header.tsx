import { observer } from 'mobx-react-lite'
import { IconButton, AppBar, Toolbar, Box } from '@mui/material'
import ListIcon from '@mui/icons-material/List'

import { ProfileMenuPopover, ChangeLangPopup, NotificationsPopover, ContactsPopover } from './ui'

interface Props {
  className?: string
  toggleMenu: () => void
}

function Header({ className, toggleMenu }: Props) {
  return (
    <AppBar
      sx={{
        backgroundColor: 'background.paper',
      }}
      position="static"
      className={className}
    >
      <Toolbar disableGutters sx={{ px: 2, py: 0, justifyContent: 'space-between' }}>
        <IconButton edge="start" color="default" aria-label="menu" onClick={toggleMenu}>
          <ListIcon />
        </IconButton>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ChangeLangPopup />
          <ContactsPopover />
          <NotificationsPopover />
          <ProfileMenuPopover />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
