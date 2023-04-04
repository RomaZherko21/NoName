import express from 'express'

import { signIn } from 'services/auth'
import {
  removeUserSelf,
  getUserSelf,
  updateUserSelf,
  uploadUserAvatar,
  getUserPermissions,
} from 'services/user'
import {
  createPost,
  createPostComment,
  deletePostById,
  deletePostComment,
  getPost,
  getPosts,
  togglePostLikes,
  updatePostComment,
} from 'services/posts'
import { getGenres } from 'services/genres'
import { createUser, getUser, getUsers, updateUserById } from 'services/users'
import {
  deleteConnectionById,
  getConnections,
  updateConnectionStatusById,
} from 'services/connections'
import {
  getQrCode,
  sendEmailVerificationCode,
  sendPhoneVerificationCode,
  toggleEmailAlerts,
  toggleSmsAlerts,
  verifyQrCode,
  verifyUserEmailByCode,
  verifyUserPhoneByCode,
} from 'services/security'
import { getChatMessages, getUserChats } from 'services/chat'
import { ROUTES } from 'shared/consts'
import { FILE_FIELD_NAMES, useFile, usePermission } from 'middlewares'

const router = express.Router()

router.post(`/${ROUTES.auth}/signIn`, signIn)

router.get(`/${ROUTES.user}`, getUserSelf)
router.put(`/${ROUTES.user}`, updateUserSelf)
router.delete(`/${ROUTES.user}`, removeUserSelf)
router.post(
  `/${ROUTES.user}/uploadPhoto`,
  useFile.single(FILE_FIELD_NAMES.avatar),
  uploadUserAvatar
)
router.get(`/${ROUTES.user}/permissions`, getUserPermissions)

router.put(`/${ROUTES.security}/email`, sendEmailVerificationCode)
router.post(`/${ROUTES.security}/email`, verifyUserEmailByCode)
router.put(`/${ROUTES.security}/email/alerts`, toggleEmailAlerts)

router.put(`/${ROUTES.security}/phone`, sendPhoneVerificationCode)
router.post(`/${ROUTES.security}/phone`, verifyUserPhoneByCode)
router.put(`/${ROUTES.security}/phone/alerts`, toggleSmsAlerts)

router.get(`/${ROUTES.security}/qr`, getQrCode)
router.put(`/${ROUTES.security}/qr`, verifyQrCode)

router.get(`/${ROUTES.users}`, usePermission, getUsers)
router.post(`/${ROUTES.users}`, usePermission, useFile.single(FILE_FIELD_NAMES.avatar), createUser)
router.get(`/${ROUTES.users}/:id`, usePermission, getUser)
router.put(`/${ROUTES.users}/:id`, usePermission, updateUserById)
router.delete(`/${ROUTES.users}/:id`, usePermission, removeUserSelf)

router.get(`/${ROUTES.posts}`, usePermission, getPosts)
router.get(`/${ROUTES.posts}/:id`, usePermission, getPost)
router.post(`/${ROUTES.posts}`, usePermission, useFile.single(FILE_FIELD_NAMES.post), createPost)
router.delete(`/${ROUTES.posts}/:id`, usePermission, deletePostById)
router.put(`/${ROUTES.posts}/:id/likes`, usePermission, togglePostLikes)

router.get(`/${ROUTES.genres}`, getGenres)

router.post(`/${ROUTES.posts}/:post_id/${ROUTES.comments}`, createPostComment)
router.delete(`/${ROUTES.posts}/:post_id/${ROUTES.comments}/:comment_id`, deletePostComment)
router.put(`/${ROUTES.posts}/:post_id/${ROUTES.comments}/:comment_id`, updatePostComment)

router.get(`/${ROUTES.connections}`, getConnections)
router.delete(`/${ROUTES.connections}/:id`, deleteConnectionById)
router.put(`/${ROUTES.connections}/:id`, updateConnectionStatusById)

router.get(`/${ROUTES.chat}`, getUserChats)
router.get(`/${ROUTES.chat}/:chat_id/messages`, getChatMessages)

export default router
