import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Box, Tooltip, IconButton } from '@mui/material'
import { BiSearchAlt2 } from 'react-icons/bi'

import { DRAWER_WIDTH } from 'shared/consts'

import {
  ProfileMenuPopover,
  ChangeLangPopup,
  NotificationsPopover,
  ContactsPopover,
  ChangeTheme
} from './ui'

function Header() {
  const { t } = useTranslation()

  return (
    <AppBar
      sx={{
        backgroundColor: 'background.header',
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
        zIndex: 1
      }}
      position="fixed"
    >
      <Toolbar disableGutters sx={{ px: 2, py: 0, justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('actions.search')}>
            <IconButton>
              <BiSearchAlt2 />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
          <ChangeTheme />
          <ChangeLangPopup />
          <NotificationsPopover />
          <ContactsPopover />
          <ProfileMenuPopover />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default observer(Header)
