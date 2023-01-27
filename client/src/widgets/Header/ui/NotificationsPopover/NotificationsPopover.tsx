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
  Typography,
  IconButton,
  ListSubheader,
} from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { MdOutlineNotificationsNone } from 'react-icons/md'

import { Popover } from 'shared/ui'

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

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    )
  }

  return (
    <Popover
      activateElement={(_, handleOpen) => (
        <Tooltip title="Notifications">
          <IconButton
            size="medium"
            sx={{ color: (theme) => theme.palette.grey[500] }}
            onClick={handleOpen}
          >
            <Badge badgeContent={totalUnRead} color="error" max={999}>
              <MdOutlineNotificationsNone />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
    >
      <>
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
      </>
    </Popover>
  )
}

export default observer(NotificationsPopover)
