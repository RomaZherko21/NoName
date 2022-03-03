import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { useDialog } from 'hooks'
import { useState } from 'react'

import ExitDialog from './ExitDialog'

const ProfileMenu = () => {
  const { t } = useTranslation()

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
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

          <ListItem
            disablePadding
            onClick={() => {
              showConfirmationModal()
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={t('common.exit')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </>
  )
}

export default ProfileMenu
