import express from 'express'

import itemController from '../controllers/item.controller'

const item = express.Router()

item.post('/create', itemController.create)

export default item
