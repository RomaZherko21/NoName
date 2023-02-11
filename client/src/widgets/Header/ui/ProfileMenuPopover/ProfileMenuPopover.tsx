import { observer } from 'mobx-react-lite'
import { Avatar, ButtonBase, CardContent, Grid, IconButton, Paper, Stack } from '@mui/material'
import { ImExit } from 'react-icons/im'

import { API_USER_AVATAR_URL } from 'shared/consts'
import { useDialog } from 'shared/hooks'
import { InformativeImage, Popover, Tabs } from 'shared/ui'
import { useRootStore } from 'stores'

import { ExitDialog, TabContent } from './ui'
import { getProfileConfig, getSettingsConfig } from './config'
import { useMemo } from 'react'

function ProfileMenuPopover() {
  const { user } = useRootStore()

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const onLogout = () => {
    showConfirmationModal()
  }

  const profileConfig = useMemo(
    () => getProfileConfig({ onLogout, id: user.id }),
    [onLogout, getProfileConfig]
  )

  const settingsConfig = useMemo(() => getSettingsConfig(), [getSettingsConfig])

  return (
    <Popover
      activateElement={(_, handleOpen) => (
        <ButtonBase onClick={handleOpen}>
          <Stack>
            <Avatar
              alt="User avatar"
              sx={{ cursor: 'pointer', width: 32, height: 32 }}
              src={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
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
              <InformativeImage
                imgUrl={`${API_USER_AVATAR_URL}/${user.avatar.url}`}
                PrimaryText={`${user.name} ${user.surname}`}
                SecondaryText={user.role}
              />
            </Grid>

            <Grid item>
              <IconButton size="small" onClick={onLogout}>
                <ImExit />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>

        <Tabs
          options={[
            {
              label: 'common.profile',
              Component: () => <TabContent config={profileConfig} onMenuClose={() => {}} />,
            },
            {
              label: 'common.settings',
              Component: () => <TabContent config={settingsConfig} onMenuClose={() => {}} />,
            },
          ]}
          variant="fullWidth"
        />
      </Paper>
    </Popover>
  )
}

export default observer(ProfileMenuPopover)
