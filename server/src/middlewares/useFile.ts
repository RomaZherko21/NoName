import { Request } from 'express'
import multer from 'multer'
import createError from 'http-errors'

type FileNameCallback = (error: Error | null, filename: string) => void

const validFileExtensions = ['image/png', 'image/jpg', 'image/jpeg']

//only multipart/form-data
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) => {
    console.log(file)
    if (file.fieldname === 'avatar') {
      cb(null, 'uploads/avatars')
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, `${file.fieldname}${Date.now()}.${file.mimetype.split('/')[1]}`)
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
