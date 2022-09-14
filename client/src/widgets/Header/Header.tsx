import { observer } from 'mobx-react-lite'
import { IconButton, AppBar, Toolbar, Typography, Tooltip, Badge, useTheme } from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GroupIcon from '@mui/icons-material/Group'

import { ProfileMenu } from './ui'

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
      <Toolbar disableGutters sx={{ flexGrow: 1, padding: '0 15px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <ListIcon />
        </IconButton>

        <Typography sx={{ flexGrow: 1 }} variant="h6">
          No Name
        </Typography>

        <Tooltip title="Contacts">
          <IconButton sx={{ ml: 1 }}>
            <GroupIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 1 }}>
            <Badge badgeContent={4} color="secondary" variant="dot">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>

        <ProfileMenu />
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
