import express from 'express'

import useFile from '../middlewares/useFile'
import userController from '../controllers/user.controller'

const user = express.Router()

user.get('/self', userController.self)

user.post('/list', userController.list)
user.post('/create', userController.create)
user.post('/update', userController.update)
user.post('/remove', userController.remove)

user.post('/uploadPhoto', useFile.single('avatar'), userController.uploadPhoto)

export default user
