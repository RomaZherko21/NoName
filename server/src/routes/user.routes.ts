import express from 'express'

import { useFile } from 'middlewares'
import { userController } from 'controllers'

const user = express.Router()

user.get('/self', userController.self)

user.post('/selfUpdate', userController.selfUpdate)
user.post('/list', userController.list)
user.post('/create', userController.create)
user.post('/update', userController.update)
user.post('/remove', userController.remove)

user.post('/uploadPhoto', useFile.single('avatar'), userController.uploadPhoto)

export default user
