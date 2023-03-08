import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Button, Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material'

import { HiOutlineUserAdd } from 'react-icons/hi'
import { FiMoreVertical } from 'react-icons/fi'
import { RiMessage2Fill } from 'react-icons/ri'

import { useRootStore } from 'stores'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { getInitials } from 'shared/helpers'
import { InformativeImage, Tabs } from 'shared/ui'
import ProfileCover from 'shared/assets/images/cover.jpg'

import s from './Styles.module.scss'
import { ProfileModel } from './model'
import { getTabsConfig } from './TabsConfig'

function Profile() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { user } = useRootStore()

  useEffect(() => {
    ProfileModel.fetchUser(Number(id))
  }, [id])

  const tabsConfig = useMemo(() => getTabsConfig(ProfileModel.id), [ProfileModel.id])

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
          SecondaryText={
            <Typography variant="subtitle2" color={'text.primary'}>
              {t('user:userId')}:{' '}
              <Chip
                label={Number(id)}
                size="small"
                sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
              />
            </Typography>
          }
          PrimaryVariant="h4"
          size="large"
        />

        {!user.isAuthorizedUser(ProfileModel.id) && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Button
              startIcon={<HiOutlineUserAdd />}
              color="primary"
              variant="outlined"
              size="small"
            >
              {t('actions.connect')}
            </Button>
            <Button startIcon={<RiMessage2Fill />} color="primary" variant="contained" size="small">
              {t('actions.sendMessage')}
            </Button>
            <Tooltip title="More info">
              <IconButton size="small">
                <FiMoreVertical />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <Tabs options={tabsConfig} />
      </Grid>
    </Grid>
  )
}

export default observer(Profile)
