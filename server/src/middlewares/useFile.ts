import multer from 'multer'

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    console.log('HEHEHE', file)
    cb(null, 'images/')
  },
  //   filename(req: any, file: any, cb: any) {
  //     cb(null, new Date().toISOString() + '-' + file.originalname)
  //   },
})

const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req: any, file: any, cb: any) => {
  console.log('FUCK')
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({ storage })
