import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'

import { Connections, Timeline } from './ui'
import ProfileCover from 'assets/images/cover.jpg'
// import { PageHeader } from 'shared/ui'

import s from './Styles.module.scss'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { useRootStore } from 'stores'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ChatIcon from '@mui/icons-material/Chat'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box } from '@mui/system'
import { SyntheticEvent, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function Profile() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      {/* <PageHeader pageName={t('page:profile')} /> */}

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
                {t('translation:actions.connect')}
              </Button>
              <Button startIcon={<ChatIcon fontSize="small" />} color="primary" variant="contained">
                {t('translation:actions.sendMessage')}
              </Button>
              <IconButton aria-label="upload picture" component="label">
                <Tooltip title="More info">
                  <MoreHorizIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Timeline" {...a11yProps(0)} />
                <Tab label="Connection" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Timeline />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Connections />
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default observer(Profile)
