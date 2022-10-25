import express from 'express'

import { useFile } from 'middlewares'
import { userController } from 'controllers'

const user = express.Router()

user.get('', userController.get)
user.put('', userController.update)
user.delete('/:id', userController.delete)

user.post('/uploadPhoto', useFile.single('avatar'), userController.uploadPhoto)

export default user
