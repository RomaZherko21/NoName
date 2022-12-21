import express from 'express'

import { signIn } from 'auth'
import { deleteUserById, getUserByEmail, updateUserByEmail, uploadUserAvatar } from 'user'
import { createPost, getPosts, removePostById } from 'posts'
import { createUser, getUsers, updateUserById } from 'users'
import { FILE_FIELD_NAMES, useFile } from 'middlewares'

const router = express.Router()

const AUTH = '/auth'
router.post(`${AUTH}/signIn`, signIn)

const USER = '/user'
router.get(`${USER}`, getUserByEmail)
router.put(`${USER}`, updateUserByEmail)
router.delete(`${USER}/:id`, deleteUserById)
router.post(`${USER}/uploadPhoto`, useFile.single(FILE_FIELD_NAMES.avatar), uploadUserAvatar)

const USERS = '/users'
router.post(`${USERS}/list`, getUsers)
router.post(`${USERS}`, createUser)
router.put(`${USERS}/:id`, updateUserById)
router.delete(`${USERS}/:id`, deleteUserById)

const POSTS = '/posts'
router.get(`${POSTS}`, getPosts)
router.post(`${POSTS}`, useFile.single(FILE_FIELD_NAMES.post), createPost)
router.delete(`${POSTS}/:id`, removePostById)

export default router
