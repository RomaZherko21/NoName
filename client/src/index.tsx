import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { RootStoreProvider } from 'stores/Root'

import './index.scss'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
