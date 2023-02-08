import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { HiOutlineUserAdd } from 'react-icons/hi'
import { FiMoreVertical } from 'react-icons/fi'
import { RiMessage2Fill } from 'react-icons/ri'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL, ROUTES } from 'shared/consts'
import { InformativeImage, Tabs } from 'shared/ui'
import { PostsFilters } from 'pages/Posts/model'
import ProfileCover from 'assets/images/cover.jpg'

import { Connections, Timeline } from './ui'
import s from './Styles.module.scss'
import { ProfileModel } from './model'

function Profile() {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const [filters] = useState<PostsFilters>({ user_id: user.id })

  useEffect(() => {
    ProfileModel.fetchPosts({ filters })
  }, [filters])

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
          imgUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
          PrimaryText={`${user.name} ${user.surname}`}
          SecondaryText={user.role}
          size="large"
        />
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
          <IconButton size="small" aria-label="upload picture" component="label">
            <Tooltip title="More info">
              <FiMoreVertical />
            </Tooltip>
          </IconButton>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          options={[
            { label: 'page:timeline', to: ROUTES.PROFILE_TIMELINE, Component: Timeline },
            {
              label: 'page:connections',
              to: ROUTES.PROFILE_CONNECTIONS,
              Component: Connections,
            },
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default observer(Profile)
