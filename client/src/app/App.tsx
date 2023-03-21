import React from 'react'
import { Slide, toast } from 'react-toastify'
import { configure } from 'mobx'
import { observer } from 'mobx-react-lite'
import { CssBaseline } from '@mui/material'

import 'react-toastify/dist/ReactToastify.css'

import { SignIn } from 'pages'
import { useRootStore, RootStoreProvider } from 'stores'

import Router from './Router'
import AppThemeProvider from './theme'

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
          {authorization.isAuthorized ? <Router /> : <SignIn />}
        </AppThemeProvider>
      </RootStoreProvider>
    </React.StrictMode>
  )
}

export default observer(App)
