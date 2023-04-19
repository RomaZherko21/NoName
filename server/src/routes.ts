import express from 'express'
import multer from 'multer'

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
  createKanbanBoardTag,
  createKanbanColumn,
  createKanbanSubtask,
  createKanbanTask,
  getBoards,
  getKanbanBoard,
  getKanbanBoardTags,
  getKanbanColumns,
  getKanbanSubtasks,
  getKanbanTask,
  getKanbanTasks,
  removeKanbanBoard,
  removeKanbanBoardTag,
  removeKanbanColumn,
  removeKanbanSubtask,
  removeKanbanTask,
  updateKanbanBoard,
  updateKanbanBoardTag,
  updateKanbanColumn,
  updateKanbanSubtask,
  updateKanbanTask,
} from 'services/kanban'
import {
  createFolder,
  getFile,
  getFiles,
  getFolder,
  getFolders,
  removeFile,
  removeFolder,
  updateFile,
  updateFolder,
  uploadFile,
} from 'services/fileManager'
import { FILE_FIELD_NAMES, ROUTES } from 'shared/consts'
import { usePermission } from 'middlewares'

const router = express.Router()

import { createNonExistFolder } from 'shared/helpers'

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
  fileManager: { files, folders },
  kanban: { kanban, boards, columns, tasks, subtasks, tags },
} = ROUTES

router.post(`/${auth}/signIn`, signIn)

router.get(`/${user}`, getUserSelf)
router.put(`/${user}`, updateUserSelf)
router.delete(`/${user}`, removeUserSelf)
router.post(
  `/${user}/uploadPhoto`,
  multer({ dest: './uploads/avatar' }).single(FILE_FIELD_NAMES.avatar),
  uploadUserAvatar
)
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
router.post(
  `/${users}`,
  usePermission,
  multer({ dest: './uploads/avatar' }).single(FILE_FIELD_NAMES.avatar),
  createUser
)
router.get(`/${users}/:id`, usePermission, getUser)
router.put(`/${users}/:id`, usePermission, updateUserById)
router.delete(`/${users}/:id`, usePermission, removeUserSelf)

router.get(`/${posts}`, usePermission, getPosts)
router.get(`/${posts}/:id`, usePermission, getPost)
router.post(
  `/${posts}`,
  usePermission,
  multer({ dest: './uploads/post' }).single(FILE_FIELD_NAMES.post),
  createPost
)
router.delete(`/${posts}/:id`, usePermission, deletePostById)
router.put(`/${posts}/:post_id/likes`, usePermission, togglePostLikes)

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

router.get(`/${kanban}/${boards}/:board_id/${columns}`, getKanbanColumns)
router.post(`/${kanban}/${boards}/:board_id/${columns}`, createKanbanColumn)
router.put(`/${kanban}/${boards}/:board_id/${columns}/:column_id`, updateKanbanColumn)
router.delete(`/${kanban}/${columns}/:column_id`, removeKanbanColumn)

router.get(`/${kanban}/${tasks}`, getKanbanTasks)
router.get(`/${kanban}/${tasks}/:task_id`, getKanbanTask)
router.post(`/${kanban}/${columns}/:column_id/${tasks}`, createKanbanTask)
router.put(`/${kanban}/${columns}/:column_id/${tasks}/:task_id`, updateKanbanTask)
router.delete(`/${kanban}/${tasks}/:task_id`, removeKanbanTask)

router.get(`/${kanban}/${tasks}/:task_id/${subtasks}`, getKanbanSubtasks)
router.post(`/${kanban}/${tasks}/:task_id/${subtasks}`, createKanbanSubtask)
router.put(`/${kanban}/${tasks}/:task_id/${subtasks}/:subtask_id`, updateKanbanSubtask)
router.delete(`/${kanban}/${subtasks}/:subtask_id`, removeKanbanSubtask)

router.get(`/${kanban}/${boards}/:board_id/${tags}`, getKanbanBoardTags)
router.post(`/${kanban}/${boards}/:board_id/${tags}`, createKanbanBoardTag)
router.put(`/${kanban}/${boards}/:board_id/${tags}/:tag_id`, updateKanbanBoardTag)
router.delete(`/${kanban}/${tags}/:tag_id`, removeKanbanBoardTag)

router.get(`/${files}`, getFiles)
router.get(`/${files}/:file_id`, getFile)
router.post(
  `/${folders}/:folder_id/${files}`,
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        const [, format] = file.originalname.split('.')

        createNonExistFolder(`./uploads/fileManager/${format}`)

        // eslint-disable-next-line unicorn/no-null
        callback(null, `./uploads/fileManager/${format}`)
      },
      filename: function (req, file, callback) {
        const [name, format] = file.originalname.split('.')

        // eslint-disable-next-line unicorn/no-null
        callback(null, `${name}-${Date.now()}.${format}`)
      },
    }),
  }).single(FILE_FIELD_NAMES.file),
  uploadFile
)
router.put(
  `/${files}/:file_id`,
  multer({ dest: './uploads/fileManager' }).single(FILE_FIELD_NAMES.file),
  updateFile
)
router.delete(`/${files}/:file_id`, removeFile)

router.get(`/${folders}`, getFolders)
router.get(`/${folders}/:folder_id`, getFolder)
router.post(`/${folders}`, createFolder)
router.put(`/${folders}/:folder_id`, updateFolder)
router.delete(`/${folders}/:folder_id`, removeFolder)

export default router
