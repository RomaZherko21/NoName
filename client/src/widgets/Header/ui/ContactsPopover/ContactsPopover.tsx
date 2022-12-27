import { useState } from 'react'
import {
  Box,
  List,
  Avatar,
  Divider,
  Popover,
  Typography,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  IconButton,
  ListItem,
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import ImageIcon from '@mui/icons-material/Image'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

const CONTACTS = [
  {
    id: 1,
    avatar: '1663318230996.png',
    name: 'Marcus Finn',
    online: true,
    last_login: '',
  },
  {
    id: 2,
    avatar: '1663318230996.png',
    name: 'Carson Darrin',
    online: false,
    last_login: '3 hours ago',
  },
]

export default function ContactsPopover() {
  const [contacts] = useState(CONTACTS)
  const [open, setOpen] = useState(null)

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget)
  }

  const onMenuClose = (event: any) => {
    setOpen(null)
  }

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton sx={{ ml: 1 }} color={open ? 'primary' : 'default'} onClick={handleOpen}>
          <GroupIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            minWidth: 250,
          },
        }}
      >
        <Box sx={{ py: 2, px: 2.5 }}>
          <Typography variant="subtitle1">Contacts</Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List disablePadding>
          {contacts.map((item: any) => (
            <ListItem
              secondaryAction={
                <Box
                  sx={{
                    backgroundColor: item.online ? 'secondary.main' : 'grey.400',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                  }}
                />
              }
            >
              <ListItemAvatar>
                <Avatar src={`${NODE_API_USER_AVATAR_URL}/${item.avatar}`}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={item.last_login ? item.last_login : ''}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  )
}
