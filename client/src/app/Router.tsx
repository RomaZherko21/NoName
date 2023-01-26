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
  NewBook,
  Post,
} from 'pages'
import { ROUTES } from 'shared/consts'

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.USERS} element={<Users />} />

      <Route path={ROUTES.BOOKS}>
        <Route path={ROUTES.BOOKS} element={<Books />} />
        <Route path={ROUTES.BOOK} element={<Book />} />
        <Route path={ROUTES.BOOK_NEW} element={<NewBook />} />
      </Route>

      <Route path={ROUTES.POSTS}>
        <Route path={ROUTES.POSTS} element={<Posts />} />
        <Route path={ROUTES.POST} element={<Post />} />
      </Route>

      <Route path={ROUTES.AUTHOR} element={<Author />} />
      <Route path={ROUTES.SUBSCRIBERS} element={<Subscribers />} />
      <Route path={ROUTES.SUBSCRIBER} element={<Subscriber />} />
      <Route path={ROUTES.SUBSCRIBTIONS} element={<Subscribtions />} />
      <Route path={ROUTES.LIBRARY_STATISTICS} element={<LibraryStatistics />} />

      <Route path={ROUTES.PROFILE}>
        <Route path={ROUTES.PROFILE_TIMELINE} element={<Profile />} />
        <Route path={ROUTES.PROFILE_FRIEND_CONNECTIONS} element={<Profile />} />
        <Route path={ROUTES.PROFILE_RECEIVED_CONNECTIONS} element={<Profile />} />
        <Route path={ROUTES.PROFILE_SENT_CONNECTIONS} element={<Profile />} />
      </Route>

      <Route path={ROUTES.ACCOUNT}>
        <Route path={ROUTES.ACCOUNT_GENERAL} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_BILLING} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_TEAM} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_NOTIFICATIONS} element={<Account />} />
        <Route path={ROUTES.ACCOUNT_SECURITY} element={<Account />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  )
}

export default observer(Router)
