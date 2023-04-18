/* eslint-disable unicorn/no-null */
import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
// import createError from 'http-errors'

type FileNameCallback = (error: Error | null, filename: string) => void

const validFileExtensions = new Set(['image/png', 'image/jpg', 'image/jpeg'])
export const FILE_FIELD_NAMES = {
  avatar: 'avatar',
  post: 'post',
  fileManager: 'fileManager',
}

// only multipart/form-data
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    if (file.fieldname === FILE_FIELD_NAMES.avatar) {
      cb(null, `uploads/${FILE_FIELD_NAMES.avatar}`)
    }
    if (file.fieldname === FILE_FIELD_NAMES.post) {
      cb(null, `uploads/${FILE_FIELD_NAMES.post}`)
    }
    if (file.fieldname === FILE_FIELD_NAMES.fileManager) {
      cb(null, `uploads/${FILE_FIELD_NAMES.fileManager}`)
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    if (file.fieldname === FILE_FIELD_NAMES.avatar) {
      cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
    if (file.fieldname === FILE_FIELD_NAMES.post) {
      cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
    if (file.fieldname === FILE_FIELD_NAMES.fileManager) {
      cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (validFileExtensions.has(file.mimetype)) {
    cb(null, true)
  } else {
    // cb(createError(400, 'Not valid file format'), false)
    cb(null, false)
  }
}

export default multer({ storage, fileFilter })
