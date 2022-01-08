import { Route, Switch } from 'react-router-dom'

import SignInPage from './pages/SignIn/SignInPage'
import routes from './services/routes'

import './App.css'

function App() {
  return (
    <Switch>
      <Route path={routes.signIn} component={SignInPage} />
      <Route path={routes.signUp} component={SignInPage} />
    </Switch>
  )
}

export default App
