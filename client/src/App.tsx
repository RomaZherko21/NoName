import { observer } from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import routes from 'services/routes'
import Layout from 'components/Layout/Layout'
import UsersList from 'pages/UsersList/UsersList'
import { useRootStore } from 'stores/Root'

import './App.scss'

function App() {
  const { authorization } = useRootStore()

  return authorization.isAuthorized ? (
    <Layout>
      <Switch>
        <Route path={routes.home} component={Home} />
        <Route path={routes.usersList} component={UsersList} />
      </Switch>
    </Layout>
  ) : (
    <Route path={routes.signIn} component={SignIn} />
  )
}

export default observer(App)
