import express from 'express'

const auth = express.Router()

import authController from '../controllers/auth.controller'

auth.post('/signIn', authController.signIn)
auth.post('/signUp', authController.signUp)

export default auth
