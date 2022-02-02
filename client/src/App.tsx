import { Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'
import routes from 'services/routes'

import './App.css'

function App() {
  return (
    <Switch>
      <Route path={routes.signIn} component={SignIn} />
      <Route path={routes.signUp} component={SignUp} />
    </Switch>
  )
}

export default App
