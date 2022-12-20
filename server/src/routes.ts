import express from 'express'

import { authController } from 'auth'
import { userController } from 'user'
import { postsController } from 'posts'
import { usersController } from 'users'
import { useFile } from 'middlewares'

const router = express.Router()

const AUTH = '/auth'
router.post(`${AUTH}/signIn`, authController.signIn)

const USER = '/user'
router.get(`${USER}`, userController.get)
router.put(`${USER}`, userController.update)
router.delete(`${USER}/:id`, userController.delete)
router.post(`${USER}/uploadPhoto`, useFile.single('avatar'), userController.uploadPhoto)

const USERS = '/users'
router.post(`${USERS}/list`, usersController.get)
router.post(`${USERS}`, usersController.create)
router.put(`${USERS}/:id`, usersController.update)
router.delete(`${USERS}/:id`, usersController.remove)

const POSTS = '/posts'
router.get(`${POSTS}`, postsController.list)
router.delete(`${POSTS}/:id`, postsController.remove)
router.post(`${POSTS}`, useFile.single('post'), postsController.create)

export default router
