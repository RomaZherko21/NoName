import express from 'express'

import usersController from './users.controller'

const users = express.Router()

users.post('/list', usersController.get)
users.post('', usersController.create)
users.put('/:id', usersController.update)
users.delete('/:id', usersController.remove)

export default users
