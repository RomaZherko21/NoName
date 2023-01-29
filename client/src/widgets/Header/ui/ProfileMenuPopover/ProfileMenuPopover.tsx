import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { CgProfile } from 'react-icons/cg'
import { IoSettingsOutline } from 'react-icons/io5'
import { ImExit } from 'react-icons/im'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useDialog } from 'shared/hooks'
import { Popover, TabPanel } from 'shared/ui'
import { useRootStore } from 'stores'

import { ExitDialog, TabContent } from './ui'
import { getProfileConfig, getSettingsConfig } from './config'
import s from './Styles.module.scss'

function ProfileMenuPopover() {
  const { t } = useTranslation()
  const { user } = useRootStore()
  const [currentTab, setCurrentTab] = useState(0)

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const onLogout = () => {
    showConfirmationModal()
  }

  const onTabChange = (_: any, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <Popover
      activateElement={(_, handleOpen) => (
        <ButtonBase onClick={handleOpen}>
          <Stack>
            <Avatar
              alt="User avatar"
              sx={{ cursor: 'pointer', width: 32, height: 32 }}
              src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
            />
          </Stack>
        </ButtonBase>
      )}
    >
      <Paper
        sx={{
          width: 290,
        }}
      >
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Avatar
                  alt="User avatar"
                  sx={{ cursor: 'pointer' }}
                  src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
                />
                <Stack>
                  <Typography variant="h6">
                    {user.name} {user.surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.role}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item>
              <IconButton size="small" onClick={onLogout}>
                <ImExit />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>

        <Box>
          <Tabs
            variant="fullWidth"
            value={currentTab}
            onChange={onTabChange}
            aria-label="profile tabs"
          >
            <Tab
              className={s.profileTab}
              icon={
                <IconButton sx={{ p: 0 }} size="medium">
                  <CgProfile />
                </IconButton>
              }
              label={t('common.profile')}
            />
            <Tab
              className={s.profileTab}
              icon={
                <IconButton sx={{ p: 0 }} size="medium">
                  <IoSettingsOutline />
                </IconButton>
              }
              label={t('common.settings')}
            />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <TabContent getConfig={getProfileConfig} onLogout={onLogout} onMenuClose={() => {}} />
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <TabContent getConfig={getSettingsConfig} onMenuClose={() => {}} />
        </TabPanel>
      </Paper>
    </Popover>
  )
}

export default observer(ProfileMenuPopover)
