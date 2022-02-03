import express from 'express'

const router = express.Router()

import auth from './auth.routes'

router.use('/auth', auth)

export default router
