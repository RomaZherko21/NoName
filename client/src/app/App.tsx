import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from 'react-modal-hook'
import { Slide, toast } from 'react-toastify'
import { configure } from 'mobx'
import { observer } from 'mobx-react-lite'

import 'react-toastify/dist/ReactToastify.css'

import { SignIn } from 'pages'
import { useRootStore, RootStoreProvider } from 'stores'

import { Layout } from './Layout'
import Router from './Router'

// import AppThemeProvider from './theme'

configure({
  reactionScheduler: (f) => setTimeout(f),
})

toast.configure({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Slide,
})

function App() {
  const { authorization } = useRootStore()

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RootStoreProvider>
          {/* <AppThemeProvider> */}
          <ModalProvider>
            {authorization.isAuthorized ? (
              <Layout>
                <Router />
              </Layout>
            ) : (
              <SignIn />
            )}
          </ModalProvider>
          {/* </AppThemeProvider> */}
        </RootStoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default observer(App)
