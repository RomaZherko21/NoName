import express from 'express'

import { useFile } from 'middlewares'
import { postController } from 'controllers'

const post = express.Router()

post.post('/list', postController.list)
post.post('/create', useFile.single('post'), postController.create)
post.post('/remove', postController.remove)

export default post
