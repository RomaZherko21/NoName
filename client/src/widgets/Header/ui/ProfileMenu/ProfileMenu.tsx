import { useRef, useState } from 'react'
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Menu,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useDialog } from 'shared/hooks'
import { useRootStore } from 'stores'

import ProfileTab from './ProfileTab'
import SettingTab from './SettingTab'
import ExitDialog from './ExitDialog'
import s from './Styles.module.scss'

function TabPanel({
  children,
  value,
  index,
}: {
  children: JSX.Element
  value: number
  index: number
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
    >
      {value === index && children}
    </div>
  )
}

function ProfileMenu() {
  const { user } = useRootStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)
  const anchorRef = useRef<any>(null)

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const onLogout = () => {
    showConfirmationModal()
  }

  const onMenuClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setIsMenuOpen(false)
  }

  const onTabChange = (_: any, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={isMenuOpen ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={() => setIsMenuOpen((prevOpen) => !prevOpen)}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="User avatar"
            sx={{ cursor: 'pointer' }}
            src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
          />
          <Typography variant="subtitle2" color="textPrimary">
            {user.name} {user.surname}
          </Typography>
        </Stack>
      </ButtonBase>

      {isMenuOpen && (
        <ClickAwayListener onClickAway={onMenuClose}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorRef.current}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorRef.current)}
            onClose={onMenuClose}
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
                    <IconButton size="large" onClick={onLogout}>
                      <ExitToAppIcon />
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
                    icon={<AccountCircleIcon fontSize="small" className={s.tabIcon} />}
                    label="Profile"
                  />
                  <Tab
                    className={s.profileTab}
                    icon={<SettingsApplicationsIcon fontSize="small" className={s.tabIcon} />}
                    label="Setting"
                  />
                </Tabs>
              </Box>
              <TabPanel value={currentTab} index={0}>
                <ProfileTab onLogout={onLogout} onMenuClose={onMenuClose} />
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <SettingTab onMenuClose={onMenuClose} />
              </TabPanel>
            </Paper>
          </Menu>
        </ClickAwayListener>
      )}
    </Box>
  )
}

export default ProfileMenu
