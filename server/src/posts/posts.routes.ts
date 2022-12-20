import express from 'express'

import { useFile } from 'middlewares'
import postsController from './posts.controller'

const posts = express.Router()

posts.get('', postsController.list)
posts.post('', useFile.single('post'), postsController.create)
posts.delete('/:id', postsController.remove)

export default posts
