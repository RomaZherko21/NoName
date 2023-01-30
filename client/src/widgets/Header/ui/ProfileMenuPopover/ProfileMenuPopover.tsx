import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  ButtonBase,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { ImExit } from 'react-icons/im'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useDialog } from 'shared/hooks'
import { Popover, Tabs } from 'shared/ui'
import { useRootStore } from 'stores'

import { ExitDialog, TabContent } from './ui'
import { getProfileConfig, getSettingsConfig } from './config'

function ProfileMenuPopover() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const onLogout = () => {
    showConfirmationModal()
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

        <Tabs
          options={[
            {
              label: t('common.profile'),
              Component: () => (
                <TabContent
                  getConfig={getProfileConfig}
                  onLogout={onLogout}
                  onMenuClose={() => {}}
                />
              ),
            },
            {
              label: t('common.settings'),
              Component: () => <TabContent getConfig={getSettingsConfig} onMenuClose={() => {}} />,
            },
          ]}
          variant="fullWidth"
        />
      </Paper>
    </Popover>
  )
}

export default observer(ProfileMenuPopover)
