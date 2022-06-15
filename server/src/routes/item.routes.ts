import express from 'express'

import itemController from '../controllers/item.controller'
import useFile from '../middlewares/useFile'

const item = express.Router()

item.post('/list', itemController.list)
item.post('/create', useFile.single('item'), itemController.create)
item.post('/remove', itemController.remove)

export default item
