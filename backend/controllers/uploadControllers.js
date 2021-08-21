import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname)
    const filename = path.basename(file.originalname, extname)
    cb(null, `${filename}-${Date.now()}${extname}`)
  },
})

const memoryStorage = multer.diskStorage({})

const checkFileType = (isImage = true, file, cb) => {
  let filetypes
  if (isImage) {
    filetypes = /jpg|jpeg|png/
  } else {
    filetypes = /jpg|jpeg|png|pdf/
  }

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    isImage ? cb('Images only!') : cb('Images and PDF only')
  }
}

export const profilePhotoUpload = multer({
  storage,
  limits: {
    fileSize: 300 * 300,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(true, file, cb)
  },
})

export const documentsUpload = multer({
  storage,
  limits: {
    fileSize: 1000 * 1000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(false, file, cb)
  },
})

export const documentsUploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 60000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(false, file, cb)
  },
})

export const profilePhotoMemoryUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 60000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(true, file, cb)
  },
})

export const imageMemoryUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 60000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(true, file, cb)
  },
})
