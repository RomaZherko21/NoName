import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Divider, Paper, Stack, Typography, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FavoriteIcon from '@mui/icons-material/Favorite'

import ProfileCover from 'assets/images/cover.jpg'
import { PopupMenu } from 'shared/ui'

import s from './Styles.module.scss'
import { getPopupConfig } from './PopupConfig'

const Post = () => {
  const { t } = useTranslation()

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
        <Divider />
      </Stack>
    </Paper>
  )
}

export default observer(Post)
