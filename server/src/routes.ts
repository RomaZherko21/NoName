import express from 'express'

import { signIn } from 'auth'
import { removeUserSelf, getUserSelf, updateUserSelf, uploadUserAvatar } from 'user'
import {
  createPost,
  createPostComment,
  deletePostById,
  deletePostComment,
  getPost,
  getPosts,
  togglePostLikes,
  updatePostComment,
} from 'posts'
import { createUser, getUser, getUsers, updateUserById } from 'users'
import { deleteConnectionById, getConnections, updateConnectionStatusById } from 'connections'
import { FILE_FIELD_NAMES, useFile } from 'middlewares'

const router = express.Router()

const AUTH = '/auth'
router.post(`${AUTH}/signIn`, signIn)

const USER = '/user'
router.get(`${USER}`, getUserSelf)
router.put(`${USER}`, updateUserSelf)
router.delete(`${USER}`, removeUserSelf)
router.post(`${USER}/uploadPhoto`, useFile.single(FILE_FIELD_NAMES.avatar), uploadUserAvatar)

const USERS = '/users'
router.get(`${USERS}`, getUsers)
router.post(`${USERS}`, createUser)
router.get(`${USERS}/:id`, getUser)
router.put(`${USERS}/:id`, updateUserById)
router.delete(`${USERS}/:id`, removeUserSelf)

const POSTS = '/posts'
router.get(`${POSTS}`, getPosts)
router.get(`${POSTS}/:id`, getPost)
router.post(`${POSTS}`, useFile.single(FILE_FIELD_NAMES.post), createPost)
router.delete(`${POSTS}/:id`, deletePostById)
router.put(`${POSTS}/:id/likes`, togglePostLikes)

const COMMENTS = '/comments'
router.post(`${POSTS}/:post_id${COMMENTS}`, createPostComment)
router.delete(`${POSTS}/:post_id${COMMENTS}/:comment_id`, deletePostComment)
router.put(`${POSTS}/:post_id${COMMENTS}/:comment_id`, updatePostComment)

const CONNECTIONS = '/connections'
router.get(`${CONNECTIONS}`, getConnections)
router.delete(`${CONNECTIONS}/:id`, deleteConnectionById)
router.put(`${CONNECTIONS}/:id`, updateConnectionStatusById)

export default router
