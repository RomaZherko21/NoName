import { observer } from 'mobx-react-lite'
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import { Users, Profile, Posts, NotFound, Account, Post, CreatePost, EditUser } from 'pages'
import { ROUTES } from 'shared/consts'

import { Layout } from './Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route path={ROUTES.USERS} element={<Users />} />
      <Route path={ROUTES.USERS_EDIT} element={<EditUser />} />

      <Route path={ROUTES.POSTS} element={<Posts />} />
      <Route path={ROUTES.POST} element={<Post />} />
      <Route path={ROUTES.POSTS_NEW} element={<CreatePost />} />

      <Route path={ROUTES.PROFILE_TIMELINE} element={<Profile />} />
      <Route path={ROUTES.PROFILE_FRIEND_CONNECTIONS} element={<Profile />} />
      <Route path={ROUTES.PROFILE_RECEIVED_CONNECTIONS} element={<Profile />} />
      <Route path={ROUTES.PROFILE_SENT_CONNECTIONS} element={<Profile />} />

      <Route path={ROUTES.ACCOUNT_GENERAL} element={<Account />} />
      <Route path={ROUTES.ACCOUNT_BILLING} element={<Account />} />
      <Route path={ROUTES.ACCOUNT_TEAM} element={<Account />} />
      <Route path={ROUTES.ACCOUNT_NOTIFICATIONS} element={<Account />} />
      <Route path={ROUTES.ACCOUNT_SECURITY} element={<Account />} />

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Route>
  )
)

function Router() {
  return <RouterProvider router={router} />
}

export default observer(Router)
