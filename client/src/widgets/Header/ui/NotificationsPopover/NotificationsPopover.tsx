import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { set, sub } from 'date-fns'
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListSubheader,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import { NotificationItem } from './ui'

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: 2,
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
]

function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [open, setOpen] = useState(null)

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    )
  }

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton sx={{ ml: 1 }} color={open ? 'primary' : 'default'} onClick={handleOpen}>
          <Badge badgeContent={totalUnRead} color="error" max={999}>
            <NotificationsIcon fontSize="medium" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
        >
          {notifications.map(
            (item) => item.isUnRead && <NotificationItem key={item.id} notification={item} />
          )}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              Before that
            </ListSubheader>
          }
        >
          {notifications.map(
            (item) => !item.isUnRead && <NotificationItem key={item.id} notification={item} />
          )}
        </List>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default observer(NotificationsPopover)
