import { observer } from 'mobx-react-lite'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom'

import { ForgotPassword, Home, ResetPassword, SignIn } from 'pages'
import { ROUTES } from 'shared/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path="*" element={<Navigate to={ROUTES.SIGN_IN} replace />} />
    </>
  )
)

function PublicRoutes() {
  return <RouterProvider router={router} />
}

export default observer(PublicRoutes)
