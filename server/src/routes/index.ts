import express from 'express'

import auth from './auth.routes'
import user from './user.routes'
import post from './post.routes'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/post', post)

export default router
