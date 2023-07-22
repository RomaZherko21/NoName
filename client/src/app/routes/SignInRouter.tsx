import { observer } from 'mobx-react-lite'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import { ForgotPassword, ResetPassword, SignIn } from 'pages'
import { ROUTES } from 'shared/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<SignIn />} />
    </>
  )
)

function SignInRouter() {
  return <RouterProvider router={router} />
}

export default observer(SignInRouter)
