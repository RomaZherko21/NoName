import React from 'react'
import ReactDOM from 'react-dom'
import { ModalProvider } from 'react-modal-hook'
import { configure } from 'mobx'
import { BrowserRouter } from 'react-router-dom'

import { RootStoreProvider } from 'stores'
// import dotenv from 'dotenv'
// import AppThemeProvider from 'theme'

import App from './App'

import './i18n'
import './index.scss'

// dotenv.config()

configure({
  reactionScheduler: (f) => setTimeout(f),
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootStoreProvider>
        {/* <AppThemeProvider> */}
        <ModalProvider>
          <App />
        </ModalProvider>
        {/* </AppThemeProvider> */}
      </RootStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
