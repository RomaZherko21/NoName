import { observer } from 'mobx-react-lite'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, Typography, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

function NotificationItem({ notification }: any) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        bgcolor: notification.isUnRead && 'action.selected',
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: 'background.neutral' }}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp; {notification.description}
            </Typography>
          </Typography>
        }
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
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

export default observer(NotificationItem)
