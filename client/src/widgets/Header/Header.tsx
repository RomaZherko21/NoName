import { observer } from 'mobx-react-lite'
import { IconButton, AppBar, Toolbar, Tooltip, Box } from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import GroupIcon from '@mui/icons-material/Group'

import { ProfileMenu, ChangeLang, NotificationsPopover } from './ui'

interface Props {
  className?: string
  toggleMenu: () => void
}

const Header = ({ className, toggleMenu }: Props) => {
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
          <ChangeLang />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <GroupIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <NotificationsPopover />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
