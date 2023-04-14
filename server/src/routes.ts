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
import {
  createKanbanBoard,
  getBoards,
  getKanbanBoard,
  removeKanbanBoard,
  updateKanbanBoard,
} from 'services/kanban'
import { ROUTES } from 'shared/consts'
import { FILE_FIELD_NAMES, useFile, usePermission } from 'middlewares'

const router = express.Router()

const {
  auth,
  user,
  security,
  users,
  posts,
  genres,
  comments,
  connections,
  chat,
  kanban: { kanban, boards },
} = ROUTES

router.post(`/${auth}/signIn`, signIn)

router.get(`/${user}`, getUserSelf)
router.put(`/${user}`, updateUserSelf)
router.delete(`/${user}`, removeUserSelf)
router.post(`/${user}/uploadPhoto`, useFile.single(FILE_FIELD_NAMES.avatar), uploadUserAvatar)
router.get(`/${user}/permissions`, getUserPermissions)

router.put(`/${security}/email`, sendEmailVerificationCode)
router.post(`/${security}/email`, verifyUserEmailByCode)
router.put(`/${security}/email/alerts`, toggleEmailAlerts)

router.put(`/${security}/phone`, sendPhoneVerificationCode)
router.post(`/${security}/phone`, verifyUserPhoneByCode)
router.put(`/${security}/phone/alerts`, toggleSmsAlerts)

router.get(`/${security}/qr`, getQrCode)
router.put(`/${security}/qr`, verifyQrCode)

router.get(`/${users}`, usePermission, getUsers)
router.post(`/${users}`, usePermission, useFile.single(FILE_FIELD_NAMES.avatar), createUser)
router.get(`/${users}/:id`, usePermission, getUser)
router.put(`/${users}/:id`, usePermission, updateUserById)
router.delete(`/${users}/:id`, usePermission, removeUserSelf)

router.get(`/${posts}`, usePermission, getPosts)
router.get(`/${posts}/:id`, usePermission, getPost)
router.post(`/${posts}`, usePermission, useFile.single(FILE_FIELD_NAMES.post), createPost)
router.delete(`/${posts}/:id`, usePermission, deletePostById)
router.put(`/${posts}/:id/likes`, usePermission, togglePostLikes)

router.get(`/${genres}`, getGenres)

router.post(`/${posts}/:post_id/${comments}`, createPostComment)
router.delete(`/${posts}/:post_id/${comments}/:comment_id`, deletePostComment)
router.put(`/${posts}/:post_id/${comments}/:comment_id`, updatePostComment)

router.get(`/${connections}`, getConnections)
router.delete(`/${connections}/:id`, deleteConnectionById)
router.put(`/${connections}/:id`, updateConnectionStatusById)

router.get(`/${chat}`, getUserChats)
router.get(`/${chat}/:chat_id/messages`, getChatMessages)

router.get(`/${kanban}/${boards}`, getBoards)
router.get(`/${kanban}/${boards}/:board_id`, getKanbanBoard)
router.post(`/${kanban}/${boards}`, createKanbanBoard)
router.put(`/${kanban}/${boards}/:board_id`, updateKanbanBoard)
router.delete(`/${kanban}/${boards}/:board_id`, removeKanbanBoard)

export default router
