import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material'

const Profile = () => {
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
              <ListItemText primary="Name" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Surname" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Email" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Role" secondary="Jan 9, 2014" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile
