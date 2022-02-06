import express from 'express'

import authController from '../controllers/auth.controller'

const auth = express.Router()

auth.post('/signIn', authController.signIn)
auth.post('/signUp', authController.signUp)

export default auth
