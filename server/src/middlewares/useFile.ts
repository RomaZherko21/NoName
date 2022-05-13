import { Request } from 'express'
import multer from 'multer'
import createError from 'http-errors'

type FileNameCallback = (error: Error | null, filename: string) => void

const validFileExtensions = ['image/png', 'image/jpg', 'image/jpeg']
const FILE_FIELD_NAMES = {
  avatar: 'avatar',
}

//only multipart/form-data
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) => {
    if (file.fieldname === FILE_FIELD_NAMES.avatar) {
      cb(null, `uploads/${FILE_FIELD_NAMES.avatar}`)
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    if (file.fieldname === FILE_FIELD_NAMES.avatar) {
      cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (err: Error | null, filename: boolean) => void
) => {
  if (validFileExtensions.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(createError(400, 'Not valid file format'), false)
  }
}

export default multer({ storage, fileFilter })
