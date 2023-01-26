import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  IconButton,
  TextField,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

import ProfileCover from 'assets/images/cover.jpg'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { PopupMenu } from 'shared/ui'
import { useRootStore } from 'stores'

import s from './Styles.module.scss'
import { getPopupConfig } from './PopupConfig'

const Post = () => {
  const { t } = useTranslation()
  const { user } = useRootStore()

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
          <IconButton>
            <PopupMenu
              ActionButton={(btnProps: any) => <ShareIcon {...btnProps} />}
              config={getPopupConfig(window.location.href, t)}
            />
          </IconButton>
        </Stack>
        <Divider sx={{ width: '100%', borderColor: '#2d3748' }} />
        <Stack direction="row" width="100%" spacing={3} alignItems="start">
          <Avatar
            alt="User avatar"
            sx={{ cursor: 'pointer', width: 40, height: 40 }}
            src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
          />
          <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
            <TextField
              placeholder={t('user:actions.writeYourComment')}
              fullWidth
              multiline
              rows={3}
            />
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
      </Stack>
    </Paper>
  )
}

export default observer(Post)
