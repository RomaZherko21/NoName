import express from 'express'

import auth from './auth.routes'
import user from './user.routes'
import users from './users.routes'
import posts from './posts.routes'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/users', users)
router.use('/posts', posts)

export default router
