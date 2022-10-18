import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Users, Books, Book, Profile, Posts, NotFound, Author } from 'pages'
import { ROUTES } from 'shared/consts'

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.USER_LIST} element={<Users />} />
      <Route path={ROUTES.BOOKS} element={<Books />} />
      <Route path={ROUTES.BOOK} element={<Book />} />
      <Route path={ROUTES.AUTHOR} element={<Author />} />
      <Route path={ROUTES.ITEMS} element={<Posts />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/" element={<Navigate to={ROUTES.USER_LIST} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  )
}

export default observer(Router)
