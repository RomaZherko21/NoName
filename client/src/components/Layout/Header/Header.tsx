import { observer } from 'mobx-react-lite'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ListIcon from '@mui/icons-material/List'
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { useState } from 'react'

interface Props {
  className?: string
  toggleMenu: () => void
}

const Header = ({ className, toggleMenu }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" className={className}>
      <Toolbar disableGutters sx={{ flexGrow: 1, padding: '0 15px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <ListIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          No Name
        </Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Box>
            <Avatar
              alt="Remy Sharp"
              sx={{ cursor: 'pointer' }}
              src="/static/images/avatar/2.jpg"
            />
          </Box>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Exit" />
              </ListItemButton>
            </ListItem>
          </List>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
