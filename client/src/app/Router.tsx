import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Users, Profile, Posts, NotFound, Account, Post, CreatePost } from 'pages'
import { ROUTES } from 'shared/consts'

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.USERS} element={<Users />} />

      <Route path={ROUTES.POSTS}>
        <Route path={ROUTES.POSTS} element={<Posts />} />
        <Route path={ROUTES.POST} element={<Post />} />
        <Route path={ROUTES.POSTS_CREATE} element={<CreatePost />} />
      </Route>

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
