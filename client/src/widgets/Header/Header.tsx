import { observer } from 'mobx-react-lite'
import { IconButton, AppBar, Toolbar, Tooltip, Badge, useTheme } from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GroupIcon from '@mui/icons-material/Group'

import { ProfileMenu, ChangeLang } from './ui'
import Profile from './ui/Profile'

interface Props {
  className?: string
  toggleMenu: () => void
}

const Header = ({ className, toggleMenu }: Props) => {
  const theme = useTheme()

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
      position="static"
      className={className}
    >
      <Toolbar disableGutters sx={{ padding: '0 15px', justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <ListIcon />
        </IconButton>

        {/* <Typography sx={{ flexGrow: 1 }} variant="h6">
          <img src="https://svgsilh.com/svg/2379396.svg" width="40px" alt="" />
        </Typography> */}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ChangeLang />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <GroupIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={12} color="secondary" max={999}>
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>
          <ProfileMenu />
          <Profile />
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
