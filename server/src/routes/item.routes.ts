import express from 'express'

import { itemController } from '../controllers'
import { useFile } from '../middlewares'

const item = express.Router()

item.post('/list', itemController.list)
item.post('/create', useFile.single('item'), itemController.create)
item.post('/remove', itemController.remove)

export default item
