import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import CottageIcon from '@mui/icons-material/Cottage'
import EmailIcon from '@mui/icons-material/Email'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useRootStore } from 'stores'
import { Post } from 'shared/ui'

const Timeline = () => {
  const { t } = useTranslation()
  const { user } = useRootStore()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ p: 2 }}>
            {t('common.about')}
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Everyone thinks of changing the world, but no one thinks of changing himself.
            </Typography>
            <List dense>
              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar>
                  <BusinessCenterIcon />
                </ListItemAvatar>
                <ListItemText
                  primary="Product Designer at Devias IO"
                  secondary="Past:UX Designer Focus Aesthetic Dynamics"
                />
              </ListItem>
              <Divider />
              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar>
                  <CottageIcon />
                </ListItemAvatar>
                <ListItemText primary="Lives in Bucharest" secondary="Originally from Rm. Valcea" />
              </ListItem>
              <Divider />
              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar>
                  <EmailIcon />
                </ListItemAvatar>
                <ListItemText primary="anika.visser@devias.io" />
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4 }}>
          <Stack direction="row" spacing={3} alignItems="start">
            <Avatar
              alt="User avatar"
              sx={{ cursor: 'pointer', width: 40, height: 40 }}
              src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
            />

            <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
              <TextField placeholder="Whats on your mind" fullWidth multiline rows={3} />
              <Stack
                direction="row"
                sx={{ mt: 2 }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row">
                  <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <AddAPhotoIcon />
                  </IconButton>
                  <IconButton aria-label="link" component="label">
                    <InsertLinkIcon />
                  </IconButton>
                  <IconButton aria-label="choose emoji" component="label">
                    <TagFacesIcon />
                  </IconButton>
                </Stack>
                <Button variant="contained">{t('actions.post')}</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Post />
      </Grid>
    </Grid>
  )
}

export default observer(Timeline)
