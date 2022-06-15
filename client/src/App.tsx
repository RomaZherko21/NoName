import 'react-toastify/dist/ReactToastify.css'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'

import SignIn from 'pages/SignIn/SignIn'
import { routes } from 'services'
import Layout from 'components/Layout/Layout'
import UsersList from 'pages/UsersList/UsersList'
import Profile from 'pages/Profile/Profile'
import { useRootStore } from 'stores/Root'

import ItemsList from 'pages/ItemsList/ItemsList'

import './App.scss'

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
    <Layout>
      <Routes>
        <Route path={routes.usersList} element={<UsersList />} />
        <Route path={routes.items} element={<ItemsList />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.NOT_FOUND} element={<>NOT FOUND</>} />
        <Route path="/" element={<Navigate to={routes.usersList} replace />} />
        <Route path="*" element={<Navigate to={routes.NOT_FOUND} replace />} />
      </Routes>
    </Layout>
  ) : (
    <SignIn />
  )
}

export default observer(App)
