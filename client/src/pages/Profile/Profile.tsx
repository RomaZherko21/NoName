import { useEffect } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { HiOutlineUserAdd } from 'react-icons/hi'
import { FiMoreVertical } from 'react-icons/fi'
import { RiMessage2Fill } from 'react-icons/ri'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { getInitials } from 'shared/helpers'
import { InformativeImage, Tabs } from 'shared/ui'
import ProfileCover from 'assets/images/cover.jpg'

import { Connections, Posts, UserInfo } from './ui'
import s from './Styles.module.scss'
import { ProfileModel } from './model'

function Profile() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { user } = useRootStore()

  useEffect(() => {
    ProfileModel.fetchUser(Number(id))
  }, [id])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <img className={s.profileCover} src={ProfileCover} alt="profile cover" />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <InformativeImage
          imgUrl={`${API_USER_AVATAR_URL}/${ProfileModel.avatar}`}
          imgPlaceholder={getInitials(`${ProfileModel.name} ${ProfileModel.surname}`)}
          PrimaryText={ProfileModel.email}
          size="large"
          PrimaryVariant="h4"
          SecondaryText={
            <Typography variant="subtitle2" color={'text.primary'}>
              user_id:{' '}
              <Chip
                label={Number(id)}
                size="small"
                sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
              />
            </Typography>
          }
        />
        {!user.isAuthorizedUser(ProfileModel.id) && (
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Button
              startIcon={<HiOutlineUserAdd fontSize="small" />}
              color="primary"
              variant="outlined"
              size="small"
            >
              {t('actions.connect')}
            </Button>
            <Button
              startIcon={<RiMessage2Fill fontSize="small" />}
              color="primary"
              variant="contained"
              size="small"
            >
              {t('actions.sendMessage')}
            </Button>
            <Tooltip title="More info">
              <IconButton size="small" aria-label="upload picture" component="label">
                <FiMoreVertical />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Grid>

      <Grid item xs={12}>
        <Tabs
          options={[
            {
              label: 'page:profile',
              to: generatePath(ROUTES.USERS_PROFILE, { id: ProfileModel.id }),
              Component: UserInfo,
            },
            {
              label: 'page:connections',
              to: generatePath(ROUTES.USERS_CONNECTIONS, { id: ProfileModel.id }),
              Component: Connections,
            },
            {
              label: 'page:posts',
              to: generatePath(ROUTES.USERS_POSTS, { id: ProfileModel.id }),
              Component: Posts,
            },
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default observer(Profile)
