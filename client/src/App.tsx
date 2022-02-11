import { observer } from 'mobx-react-lite'
import { Redirect, Route, Switch } from 'react-router-dom'

import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import routes from 'services/routes'
import Layout from 'components/Layout/Layout'
import UsersList from 'pages/UsersList/UsersList'
import { useRootStore } from 'stores/Root'

import './App.scss'
import Notification from 'components/Notification/Notification'

function App() {
  const {
    authorization,
    notification: { message, isOpen, severity },
  } = useRootStore()

  return authorization.isAuthorized ? (
    <>
      <Notification message={message} open={isOpen} severity={severity} />
      <Layout>
        <Switch>
          <Route path={routes.home} component={Home} />
          <Route path={routes.usersList} component={UsersList} />
        </Switch>
      </Layout>
    </>
  ) : (
    <>
      <Redirect to={routes.signIn} />
      <Route path={routes.signIn} component={SignIn} />
    </>
  )
}

export default observer(App)
