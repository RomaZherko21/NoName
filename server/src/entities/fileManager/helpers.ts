import multer from 'multer'
import { FILE_MANAGER_FOLDER } from 'shared/consts'

export const fileManagerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    // eslint-disable-next-line unicorn/no-null
    callback(null, `${FILE_MANAGER_FOLDER}/${file.originalname.split('.')[1]}`)
  },
  filename: function (req, file, callback) {
    const [name, format] = file.originalname.split('.')
    // eslint-disable-next-line unicorn/no-null
    callback(null, `${name}-${Date.now()}.${format}`)
  },
})
