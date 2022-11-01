import { useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// project import
import ProfileTab from './ProfileTab'
import SettingTab from './SettingTab'

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

const Profile = () => {
  const theme = useTheme()

  const handleLogout = async () => {
    // logout
  }

  const anchorRef = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const [value, setValue] = useState(0)

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const iconBackColorOpen = 'grey.300'

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">John Doe</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        // popperOptions={{
        //   modifiers: [
        //     {
        //       name: 'offset',
        //       options: {
        //         offset: [0, 9],
        //       },
        //     },
        //   ],
        // }}
      >
        <>
          {open && (
            <ClickAwayListener onClickAway={handleClose}>
              <Paper
                sx={{
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                }}
              >
                <>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
                          <Stack>
                            <Typography variant="h6">John Doe</Typography>
                            <Typography variant="body2" color="textSecondary">
                              UI/UX Designer
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <IconButton
                          size="large"
                          color="secondary"
                          onClick={handleLogout}
                        ></IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                  {open && (
                    <>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                          variant="fullWidth"
                          value={value}
                          onChange={handleChange}
                          aria-label="profile tabs"
                        >
                          <Tab
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'capitalize',
                            }}
                            icon={<DeleteIcon style={{ marginBottom: 0, marginRight: '10px' }} />}
                            label="Profile"
                          />
                          <Tab
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'capitalize',
                            }}
                            icon={<DeleteIcon style={{ marginBottom: 0, marginRight: '10px' }} />}
                            label="Setting"
                          />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0}>
                        <ProfileTab handleLogout={handleLogout} />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <SettingTab />
                      </TabPanel>
                    </>
                  )}
                </>
              </Paper>
            </ClickAwayListener>
          )}
        </>
      </Popper>
    </Box>
  )
}

export default Profile
