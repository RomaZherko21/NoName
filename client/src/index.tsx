import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from 'react-modal-hook'

import { RootStoreProvider } from 'stores/Root'
// import AppThemeProvider from 'theme'

import './index.scss'
import App from './App'

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
