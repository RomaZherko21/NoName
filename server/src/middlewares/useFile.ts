import multer from 'multer'

//only multipart/form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + '.jpg')
  },
})

export default multer({ storage })
