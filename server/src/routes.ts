import express from 'express'

import { auth } from 'auth'
import { user } from 'user'
import { users } from 'users'
import { posts } from 'posts'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/users', users)
router.use('/posts', posts)

export default router
