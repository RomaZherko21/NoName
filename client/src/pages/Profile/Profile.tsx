import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material'
import { useRootStore } from 'stores/Root'

const Profile = () => {
  const { user } = useRootStore()

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 146, height: 146 }}
          />
        </Grid>
        <Grid item>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Name" secondary={user.name} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Surname" secondary={user.surname} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Role" secondary={user.role_id} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile
