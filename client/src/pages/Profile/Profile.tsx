import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ChatIcon from '@mui/icons-material/Chat'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { NODE_API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { Tabs } from 'shared/ui'
import { useRootStore } from 'stores'
import ProfileCover from 'assets/images/cover.jpg'

import s from './Styles.module.scss'
import { ReceivedConnections, SentConnections, Timeline } from './ui'

function Profile() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img className={s.profileCover} src={ProfileCover} alt="profile cover" />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                alt="User avatar"
                sx={{ cursor: 'pointer', width: 64, height: 64 }}
                src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
              />
              <Stack>
                <Typography variant="h6" color="textPrimary">
                  {user.name} {user.surname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.role}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Button
                startIcon={<PersonAddIcon fontSize="small" />}
                color="primary"
                variant="outlined"
              >
                {t('actions.connect')}
              </Button>
              <Button startIcon={<ChatIcon fontSize="small" />} color="primary" variant="contained">
                {t('actions.sendMessage')}
              </Button>
              <IconButton aria-label="upload picture" component="label">
                <Tooltip title="More info">
                  <MoreHorizIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Tabs
              options={[
                { label: 'Timeline', to: ROUTES.PROFILE_TIMELINE, Component: Timeline },
                {
                  label: 'Sent Connections',
                  to: ROUTES.PROFILE_SENT_CONNECTIONS,
                  Component: SentConnections,
                },
                {
                  label: 'Received Connections',
                  to: ROUTES.PROFILE_RECEIVED_CONNECTIONS,
                  Component: ReceivedConnections,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default observer(Profile)
