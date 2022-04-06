import express from 'express'

import auth from './auth.routes'
import user from './user.routes'
import item from './item.routes'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/item', item)

export default router
