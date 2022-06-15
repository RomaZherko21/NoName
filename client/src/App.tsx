import 'react-toastify/dist/ReactToastify.css'
import { observer } from 'mobx-react-lite'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'

import SignIn from 'pages/SignIn/SignIn'
import { routes } from 'services'
import Layout from 'components/Layout/Layout'
import UsersList from 'pages/UsersList/UsersList'
import Profile from 'pages/Profile/Profile'
import { useRootStore } from 'stores/Root'

import './App.scss'
import ItemsList from 'pages/ItemsList/ItemsList'

toast.configure({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Slide,
})

function App() {
  const { authorization } = useRootStore()

  return authorization.isAuthorized ? (
    <>
      <Layout>
        <Switch>
          <Redirect from={routes.signIn} to={routes.usersList} />
          <Route path={routes.usersList} component={UsersList} />
          <Route path={routes.items} component={ItemsList} />
          <Route path={routes.profile} component={Profile} />
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
