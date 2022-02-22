import { observer } from 'mobx-react-lite'
import { Redirect, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Slide, toast } from 'react-toastify'

import SignIn from 'pages/SignIn/SignIn'
import routes from 'services/routes'
import Layout from 'components/Layout/Layout'
import UsersList from 'pages/UsersList/UsersList'
import { useRootStore } from 'stores/Root'

import './App.scss'

toast.configure({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
})

function App() {
  const { authorization } = useRootStore()

  return true ? (
    <>
      <Layout>
        <Switch>
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
