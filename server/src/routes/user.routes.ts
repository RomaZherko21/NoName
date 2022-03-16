import express from 'express'

import userController from '../controllers/user.controller'

const user = express.Router()

user.get('/list', userController.list)
user.get('/self', userController.self)

user.post('/create', userController.create)
user.post('/update', userController.update)
user.post('/remove', userController.remove)

export default user
