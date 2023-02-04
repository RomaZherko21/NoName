import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'

import { IoBusinessOutline, IoHomeOutline } from 'react-icons/io5'
import { BsEnvelopeOpen } from 'react-icons/bs'

import { useRootStore } from 'stores'
import { PostCard } from 'features'
import { LeaveComment, Spinner } from 'shared/ui'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { ProfileModel } from 'pages/Profile/model'

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
            <List>
              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar sx={{ fontSize: '20px', color: 'text.secondary' }}>
                  <IoBusinessOutline />
                </ListItemAvatar>
                <ListItemText
                  primary="Product Designer at Devias IO"
                  secondary="Past:UX Designer Focus Aesthetic Dynamics"
                />
              </ListItem>
              <Divider />

              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar sx={{ fontSize: '20px', color: 'text.secondary' }}>
                  <IoHomeOutline />
                </ListItemAvatar>
                <ListItemText primary="Lives in Bucharest" secondary="Originally from Rm. Valcea" />
              </ListItem>
              <Divider />

              <ListItem sx={{ p: 0, pt: 2 }}>
                <ListItemAvatar sx={{ fontSize: '20px', color: 'text.secondary' }}>
                  <BsEnvelopeOpen />
                </ListItemAvatar>
                <ListItemText primary="anika.visser@devias.io" />
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <LeaveComment
          avatarUrl={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
          label="user:whatsOnYourMind"
          filledBackground
        />

        {ProfileModel.loading.has ? (
          <Spinner />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ProfileModel.posts.map((post) => (
              <PostCard
                post={post}
                toggleLike={() => ProfileModel.toggleLike({ post_id: post.id })}
              />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default observer(Timeline)
