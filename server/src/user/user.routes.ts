import express from 'express'

import { useFile } from 'middlewares'
import userController from './user.controller'

const user = express.Router()

user.get('', userController.get)
user.put('', userController.update)
user.delete('/:id', userController.delete)

user.post('/uploadPhoto', useFile.single('avatar'), userController.uploadPhoto)

export default user
