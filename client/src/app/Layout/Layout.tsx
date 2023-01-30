import { observer } from 'mobx-react-lite'
import { Box, Toolbar } from '@mui/material'

import { NavBar, Header } from 'widgets'
import { DRAWER_WIDTH } from 'shared/consts'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />

      <NavBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 7,
          px: 4,
          width: { xs: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default observer(Layout)
