import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const PopupMenu = ({ children }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  //   const handleMenu = (event: any) => {
  //     setAnchorEl(event.currentTarget)
  //   }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {children}
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
          <Link
            to="/profile"
            style={{ color: 'inherit', textDecoration: 'none' }}
            color="black"
          >
            <ListItem disablePadding onClick={() => handleClose()}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={t('common.profile')} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Menu>
    </>
  )
}

export default PopupMenu
