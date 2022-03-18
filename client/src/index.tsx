import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from 'react-modal-hook'
import { configure } from 'mobx'

import { RootStoreProvider } from 'stores/Root'
// import AppThemeProvider from 'theme'

import App from './App'

import './index.scss'
import './i18n'

configure({
  reactionScheduler: (f) => setTimeout(f),
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RootStoreProvider>
        {/* <AppThemeProvider> */}
        <ModalProvider>
          <App />
        </ModalProvider>
        {/* </AppThemeProvider> */}
      </RootStoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
