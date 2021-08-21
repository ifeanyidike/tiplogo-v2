import express from 'express'
const router = express.Router()

import {
  createOLevelResultUploadOrder,
  getOLevelResultUploadOrderById,
  getMyOLevelResultUploadOrders,
  adminGetMyOLevelResultUploadOrders,
  getOLevelResultUploadOrders,
  adminOLevelResultUploadFileUpload,
  deleteOLevelResultUploadOrder,
  getOLevelResultUploadBlobById,
} from '../controllers/oLevelResultUploadControllers.js'

import {
  documentsUpload,
  imageMemoryUpload,
  documentsUploadMemory,
} from '../controllers/uploadControllers.js'

import { protect, admin, managers } from '../middlewares/authMiddleware.js'

router
  .route('/')
  .post(
    protect,
    documentsUploadMemory.array('document'),
    createOLevelResultUploadOrder,
  )
  .get(protect, managers, getOLevelResultUploadOrders)

router.route('/myorders').get(protect, getMyOLevelResultUploadOrders)
router
  .route('/myorders/:userId')
  .get(protect, adminGetMyOLevelResultUploadOrders)

router.route('/:id/blob').get(getOLevelResultUploadBlobById)

router
  .route('/:id')
  .get(protect, getOLevelResultUploadOrderById)
  .delete(protect, admin, deleteOLevelResultUploadOrder)

router
  .route('/:id/adminupload')
  .put(
    protect,
    managers,
    documentsUploadMemory.single('document'),
    adminOLevelResultUploadFileUpload,
  )

export default router
