import { useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, ButtonBase, CardContent, Grid, IconButton, Paper, Stack } from '@mui/material'
import { ImExit } from 'react-icons/im'

import { API_USER_AVATAR_URL } from 'shared/consts'
import { InformativeImage, Popover, Tabs } from 'shared/ui'
import { useRootStore } from 'stores'

import { ExitDialog, TabContent } from './ui'
import { getProfileConfig, getSettingsConfig } from './config'

function ProfileMenuPopover() {
  const { user } = useRootStore()

  const [isOpenModal, setIsOpenModal] = useState(false)

  function onLogout() {
    setIsOpenModal(true)
  }

  const profileConfig = useMemo(() => getProfileConfig({ onLogout, id: user.id }), [user.id])

  const settingsConfig = useMemo(() => getSettingsConfig(), [])

  return (
    <>
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

      <ExitDialog
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false)
        }}
      />
    </>
  )
}

export default observer(ProfileMenuPopover)
