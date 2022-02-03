import { Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'
import routes from 'services/routes'

import './App.scss'

function App() {
  return (
    <div className=".root">
      <Switch>
        <Route path={routes.signIn} component={SignIn} />
        <Route path={routes.signUp} component={SignUp} />
      </Switch>
    </div>
  )
}

export default App
