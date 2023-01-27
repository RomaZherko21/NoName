import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Box, Drawer, List } from '@mui/material'
import { HiOutlineUsers } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'

import { DRAWER_WIDTH, ROUTES } from 'shared/consts'

import AsideItemLink from './AsideItemLink'

import logo from 'assets/images/logo/white-transparent-logo.svg'

const Aside = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: 'background.rare',
            p: 2,
          },
        }}
        open
      >
        <img
          alt="Under development"
          src={logo}
          style={{
            width: 120,
          }}
        />
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AsideItemLink icon={<HiOutlineUsers />} title={t('page:users')} to={ROUTES.USERS} />

          <AsideItemLink icon={<IoNewspaperOutline />} title={t('page:posts')} to={ROUTES.POSTS} />
        </List>
      </Drawer>
    </Box>
  )
}

export default observer(Aside)
