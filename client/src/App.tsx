import { Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import routes from 'services/routes'
import Layout from 'components/Layout/Layout'

import './App.scss'
import { observer } from 'mobx-react-lite'
import { useRootStore } from 'stores/Root'

function App() {
  const { authorization } = useRootStore()

  return authorization.isAuthorized ? (
    <Layout>
      <Switch>
        <Route path={routes.home} component={Home} />
      </Switch>
    </Layout>
  ) : (
    <Route path={routes.signIn} component={SignIn} />
  )
}

export default observer(App)
