/* eslint-disable unicorn/no-null */

import { Request } from 'express'
import { FileFilterCallback } from 'multer'

export function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  const allowedFileTypes = [
    'jpg',
    'jpeg',
    'gif',
    'png',
    'svg',
    'tif',
    'pdf',
    'docx',
    'doc',
    'html',
    'xlsx',
    'xls',
    'txt',
    'pptx',
  ]

  const format = file.originalname.split('.')[1]

  const isValidFileType = allowedFileTypes.includes(format.toLowerCase())

  if (isValidFileType) {
    cb(null, true)
  } else {
    cb(new Error(`Only images with the ${allowedFileTypes.join(', ')} extension are allowed`))
  }
}

export const imgLimits = {
  fileSize: 1024 * 1024 * 5, // 5 MB
}

export const fileLimits = {
  fileSize: 1024 * 1024 * 50, // 50 MB
}
