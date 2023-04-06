import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'

import { NavBar, Header } from 'widgets'
import { DRAWER_WIDTH, ROUTES } from 'shared/consts'

const Layout = () => {
  const location = useLocation()

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      {/* <Header />

      <NavBar /> */}
      {location.pathname === ROUTES.CHAT || location.pathname === ROUTES.KANBAN ? (
        <Box sx={{ width: { xs: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
          <Toolbar />
          <Outlet />
        </Box>
      ) : (
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: 7,
            px: 4,
            width: { xs: `calc(100% - ${DRAWER_WIDTH}px)` }
          }}
        >
          <Toolbar />
          <Outlet />
        </Container>
      )}
    </Box>
  )
}

export default observer(Layout)
