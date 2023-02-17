import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'

import { NavBar, Header } from 'widgets'
import { DRAWER_WIDTH } from 'shared/consts'

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Header />

      <NavBar />
      <Box sx={{ width: { xs: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default observer(Layout)
