import { Redirect, Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import SignUp from 'pages/SignUp/SignUp'
import Home from 'pages/Home/Home'
import routes from 'services/routes'

import useAuthorize from 'hooks/useAuthorize'

import './App.scss'
import { useRootStore } from 'stores/Root'
import { observer } from 'mobx-react-lite'

function App() {
  const { authorization } = useRootStore()
  console.log(authorization.isAuthorized)
  return (
    <div className=".root">
      <Switch>
        <Route path={routes.home} component={Home} />
        <Route path={routes.signIn} component={SignIn} />
        <Route path={routes.signUp} component={SignUp} />
        {/* {authorization.isAuthorized && <Redirect to={routes.home} />} */}
      </Switch>
    </div>
  )
}

export default observer(App)
