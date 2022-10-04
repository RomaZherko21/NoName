import express from 'express'

import { usersController } from 'controllers'

const users = express.Router()

users.post('/list', usersController.get)
users.post('', usersController.create)
users.put('/:id', usersController.update)
users.delete('/:id', usersController.remove)

export default users
