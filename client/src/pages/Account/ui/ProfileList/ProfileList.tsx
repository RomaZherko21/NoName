import {
  Avatar,
  Card,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MapsUgcIcon from '@mui/icons-material/MapsUgc'
import SettingsIcon from '@mui/icons-material/Settings'

function ProfileList() {
  const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
  }

  const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none',
  }

  return (
    <Card sx={{ mt: 2 }}>
      <List
        component="nav"
        sx={{
          p: 0,
          '& .MuiListItemButton-root': {
            py: 1.5,
            '& .MuiAvatar-root': avatarSX,
            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' },
          },
        }}
      >
        <ListItemButton divider>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'success.main',
                bgcolor: 'success.lighter',
              }}
            >
              <CardGiftcardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">Order #002434</Typography>}
            secondary="Today, 2:00 AM"
          />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $1,430
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                78%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton divider>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter',
              }}
            >
              <MapsUgcIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">Order #984947</Typography>}
            secondary="5 August, 1:45 PM"
          />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $302
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                8%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'error.main',
                bgcolor: 'error.lighter',
              }}
            >
              <SettingsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">Order #988784</Typography>}
            secondary="7 hours ago"
          />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $682
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                16%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
      </List>
    </Card>
  )
}

export default ProfileList
