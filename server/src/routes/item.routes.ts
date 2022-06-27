import express from 'express'

import { useFile } from 'middlewares'
import { itemController } from 'controllers'

const item = express.Router()

item.post('/list', itemController.list)
item.post('/create', useFile.single('item'), itemController.create)
item.post('/remove', itemController.remove)

export default item
