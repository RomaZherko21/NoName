import express from 'express'

import authController from './auth.controller'

const auth = express.Router()

auth.post('/signIn', authController.signIn)

export default auth
