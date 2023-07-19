import { observer } from 'mobx-react-lite'
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import {
  Users,
  Profile,
  Posts,
  NotFound,
  Account,
  Post,
  CreatePost,
  EditUser,
  CreateUser,
  FileManager,
  Chat,
  Kanban,
  Home,
  Contact,
  ForgotPassword
  // RestorePassword
} from 'pages'
import { ROUTES } from 'shared/consts'

import { Layout } from './Layout'
import { ResetPassword } from 'pages/RestorePassword'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESETPASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route path={ROUTES.CONTACT} element={<Contact />} />

      <Route path={ROUTES.DEFAULT} element={<Layout />}>
        <Route path={ROUTES.USERS} element={<Users />} />
        <Route path={ROUTES.USERS_NEW} element={<CreateUser />} />
        <Route path={ROUTES.USERS_EDIT} element={<EditUser />} />

        <Route path={ROUTES.USERS_PROFILE} element={<Profile />} />
        <Route path={ROUTES.USERS_CONNECTIONS} element={<Profile />} />
        <Route path={ROUTES.USERS_POSTS} element={<Profile />} />

        <Route path={ROUTES.POSTS} element={<Posts />} />
        <Route path={ROUTES.POST} element={<Post />} />
        <Route path={ROUTES.POSTS_NEW} element={<CreatePost />} />

        <Route path={ROUTES.ACCOUNT_GENERAL} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_BILLING} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_TEAM} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_NOTIFICATIONS} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_SECURITY} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_VERIFICATION} element={<Account />} />

        <Route path={ROUTES.CHAT} element={<Chat />} />

        <Route path={ROUTES.FILE_MANAGER} element={<FileManager />} />

        <Route path={ROUTES.KANBAN} element={<Kanban />} />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />

        {/* <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} /> */}
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Route>
    </>
  )
)

function Router() {
  return <RouterProvider router={router} />
}

export default observer(Router)
