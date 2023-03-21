import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Drawer, List } from '@mui/material'

import { DRAWER_WIDTH } from 'shared/consts'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import { NavBarItem } from './ui'
import { config } from './config'

const NavBar = () => {
  const navBarConfig = useMemo(() => config, [])

  return (
    <Box component="nav" sx={{ width: DRAWER_WIDTH }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: 'background.rare',
            p: 2,
            border: 'none'
          }
        }}
        open
      >
        <img
          alt="NoName logo"
          src={logo}
          style={{
            width: 120
          }}
        />
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
          {navBarConfig.map((item) => (
            <NavBarItem
              icon={item.icon}
              title={item.title}
              collapsedItems={item?.collapsedItems}
              to={item?.to}
              accessRoute={item.accessRoute}
              accessOperation={item.accessOperation}
              key={item.to}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default observer(NavBar)
