import express from 'express'

import auth from './auth.ROUTES'
import user from './user.ROUTES'
import item from './item.ROUTES'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/item', item)

export default router
