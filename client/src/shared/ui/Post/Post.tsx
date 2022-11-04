import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { fromMsToDate } from 'shared/helpers'
import { COMMON_DATE_FORMAT } from 'shared/consts'
import { PopupMenu } from 'shared/ui'

import s from './Styles.module.scss'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

import ProfileCover from 'assets/images/cover.jpg'

const Post = () => {
  return (
    <Paper sx={{ p: 4, mt: 2 }}>
      <Stack direction="row" spacing={1.2} alignItems="start">
        <Avatar
          alt="User avatar"
          sx={{ width: 54, height: 54 }}
          src={`https://material-kit-pro-react.devias.io/static/mock-images/avatars/avatar-carson_darrin.png`}
        />
        <Stack spacing={1}>
          <Typography variant="body2">Anika Visser</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <AccessTimeIcon /> 4 hours ago
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ mt: 4 }} alignItems="start">
        <Typography variant="body1">
          Just made this overview screen for a project, what-cha thinkin?
        </Typography>
        <img className={s.profileCover} src={ProfileCover} alt="profile cover" />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Button
            color="inherit"
            startIcon={<FavoriteIcon color="error" fontSize="small" />}
            variant="text"
          >
            22
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <Tooltip title="Share">
              <ShareIcon />
            </Tooltip>
          </IconButton>
        </Stack>
        <Divider />
      </Stack>
    </Paper>
  )
}

export default observer(Post)
