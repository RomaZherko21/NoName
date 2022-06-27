import express from 'express'

import { authController } from '../controllers'

const auth = express.Router()

auth.post('/signIn', authController.signIn)

export default auth
