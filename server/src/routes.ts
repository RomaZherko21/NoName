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

router.post(`/${ROUTES.AUTH}/signIn`, signIn)

router.get(`/${ROUTES.USER}`, getUserSelf)
router.put(`/${ROUTES.USER}`, updateUserSelf)
router.delete(`/${ROUTES.USER}`, removeUserSelf)
router.post(
  `/${ROUTES.USER}/uploadPhoto`,
  useFile.single(FILE_FIELD_NAMES.avatar),
  uploadUserAvatar
)
router.get(`/${ROUTES.USER}/permissions`, getUserPermissions)

router.put(`/${ROUTES.SECURITY}/email`, sendEmailVerificationCode)
router.post(`/${ROUTES.SECURITY}/email`, verifyUserEmailByCode)
router.put(`/${ROUTES.SECURITY}/email/alerts`, toggleEmailAlerts)

router.put(`/${ROUTES.SECURITY}/phone`, sendPhoneVerificationCode)
router.post(`/${ROUTES.SECURITY}/phone`, verifyUserPhoneByCode)
router.put(`/${ROUTES.SECURITY}/phone/alerts`, toggleSmsAlerts)

router.get(`/${ROUTES.SECURITY}/qr`, getQrCode)
router.put(`/${ROUTES.SECURITY}/qr`, verifyQrCode)

router.get(`/${ROUTES.USERS}`, usePermission, getUsers)
router.post(`/${ROUTES.USERS}`, usePermission, useFile.single(FILE_FIELD_NAMES.avatar), createUser)
router.get(`/${ROUTES.USERS}/:id`, usePermission, getUser)
router.put(`/${ROUTES.USERS}/:id`, usePermission, updateUserById)
router.delete(`/${ROUTES.USERS}/:id`, usePermission, removeUserSelf)

router.get(`/${ROUTES.POSTS}`, usePermission, getPosts)
router.get(`/${ROUTES.POSTS}/:id`, usePermission, getPost)
router.post(`/${ROUTES.POSTS}`, usePermission, useFile.single(FILE_FIELD_NAMES.post), createPost)
router.delete(`/${ROUTES.POSTS}/:id`, usePermission, deletePostById)
router.put(`/${ROUTES.POSTS}/:id/likes`, usePermission, togglePostLikes)

router.get(`/${ROUTES.GENRES}`, getGenres)

router.post(`/${ROUTES.POSTS}/:post_id/${ROUTES.COMMENTS}`, createPostComment)
router.delete(`/${ROUTES.POSTS}/:post_id/${ROUTES.COMMENTS}/:comment_id`, deletePostComment)
router.put(`/${ROUTES.POSTS}/:post_id/${ROUTES.COMMENTS}/:comment_id`, updatePostComment)

router.get(`/${ROUTES.CONNECTIONS}`, getConnections)
router.delete(`/${ROUTES.CONNECTIONS}/:id`, deleteConnectionById)
router.put(`/${ROUTES.CONNECTIONS}/:id`, updateConnectionStatusById)

router.get(`/${ROUTES.CHAT}`, getUserChats)
router.get(`/${ROUTES.CHAT}/:chat_id/messages`, getChatMessages)

export default router
