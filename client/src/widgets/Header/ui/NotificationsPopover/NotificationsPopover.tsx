import { formatDistanceToNow, set, sub } from 'date-fns'
import { useState } from 'react'
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DoneAllIcon from '@mui/icons-material/DoneAll'

function fToNow(date: any) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : ''
}

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
    title: 'sdfsdf',
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: 3,
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: 4,
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: 5,
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
]

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length

  const [open, setOpen] = useState(null)

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

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
        >
          {notifications.slice(0, 2).map((notification: any) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              Before that
            </ListSubheader>
          }
        >
          {notifications.slice(2, 5).map((notification: any) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </List>
        {/* </Scrollbar> */}

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

function NotificationItem({ notification }: any) {
  const { avatar, title } = renderContent(notification)

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <AccountBoxIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

function renderContent(notification: any) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  )

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
      ),
      title,
    }
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
      ),
      title,
    }
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      ),
      title,
    }
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
      ),
      title,
    }
  }
  return {
    avatar: notification.avatar ? (
      <img
        alt={notification.title}
        src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
    ) : null,
    title,
  }
}
