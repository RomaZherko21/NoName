import React from 'react'
import { Slide, toast } from 'react-toastify'
import { configure } from 'mobx'
import { observer } from 'mobx-react-lite'
import { CssBaseline } from '@mui/material'

import 'react-toastify/dist/ReactToastify.css'

import { useRootStore, RootStoreProvider } from 'stores'

import { PrivateRoutes } from './routes'
import AppThemeProvider from './theme'
import PublicRoutes from './routes/PublicRoutes'

configure({
  reactionScheduler: (f) => setTimeout(f)
})

toast.configure({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Slide
})

function App() {
  const { authorization } = useRootStore()

  return (
    <React.StrictMode>
      <RootStoreProvider>
        <AppThemeProvider>
          <CssBaseline enableColorScheme />
          {authorization.isAuthorized ? <PrivateRoutes /> : <PublicRoutes />}
        </AppThemeProvider>
      </RootStoreProvider>
    </React.StrictMode>
  )
}

export default observer(App)
