import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import {
  Users,
  Books,
  Book,
  Profile,
  Posts,
  NotFound,
  Author,
  Subscribers,
  Subscribtions,
  Subscriber,
  LibraryStatistics,
  Account,
} from 'pages'
import { ROUTES } from 'shared/consts'

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.USERS} element={<Users />} />
      <Route path={ROUTES.BOOKS} element={<Books />} />
      <Route path={ROUTES.BOOK} element={<Book />} />
      <Route path={ROUTES.AUTHOR} element={<Author />} />
      <Route path={ROUTES.POSTS} element={<Posts />} />
      <Route path={ROUTES.SUBSCRIBERS} element={<Subscribers />} />
      <Route path={ROUTES.SUBSCRIBER} element={<Subscriber />} />
      <Route path={ROUTES.SUBSCRIBTIONS} element={<Subscribtions />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.LIBRARY_STATISTICS} element={<LibraryStatistics />} />
      <Route path={ROUTES.ACCOUNT} element={<Account />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  )
}

export default observer(Router)
