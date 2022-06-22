import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { UsersList, Profile, ItemsList } from 'pages'
import { ROUTES } from 'shared/consts'

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.USER_LIST} element={<UsersList />} />
      <Route path={ROUTES.ITEMS} element={<ItemsList />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.NOT_FOUND} element={<>NOT FOUND</>} />
      <Route path="/" element={<Navigate to={ROUTES.USER_LIST} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  )
}

export default observer(Router)
