import { observer } from 'mobx-react-lite'
import { Box, Toolbar } from '@mui/material'

import { Aside, Header } from 'widgets'
import { DRAWER_WIDTH } from 'shared/consts'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />

      <Aside />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
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
