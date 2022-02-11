import express from 'express'

import userController from '../controllers/user.controller'

const user = express.Router()

user.get('/list', userController.list)
user.post('/create', userController.create)

export default user
