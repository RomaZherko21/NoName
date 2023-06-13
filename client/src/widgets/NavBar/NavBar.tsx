import { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Drawer, List, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

import { DRAWER_WIDTH, ROUTES } from 'shared/consts'
import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

import { NavBarItem } from './ui'
import { config } from './config'
import { NavBarModel } from './model/index.'

const NavBar = () => {
  const navBarConfig = useMemo(() => config(), [NavBarModel.boards])

  useEffect(() => {
    NavBarModel.fetchBoards()
  }, [])

  return (
    <Box component="nav" sx={{ width: DRAWER_WIDTH }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: '#1C2536',
            p: 2,
            border: 'none'
          }
        }}
        open
      >
        <MuiLink component={Link} to={ROUTES.HOME} sx={{ width: 'fit-content' }}>
          <img
            alt="NoName logo"
            src={logo}
            style={{
              width: 120
            }}
          />
        </MuiLink>
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
