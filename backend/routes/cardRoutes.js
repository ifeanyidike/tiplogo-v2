import express from 'express'
const router = express.Router()

import {
  getCards,
  getFewCards,
  getCardById,
  deleteCard,
  createCard,
  updateCard,
  addCardItem,
  deliverCardItem,
} from '../controllers/cardControllers.js'

import {
  profilePhotoUpload,
  imageMemoryUpload,
  documentsUploadMemory,
} from '../controllers/uploadControllers.js'
import {
  createSoldCard,
  getMySoldCards,
} from '../controllers/soldCardControllers.js'
import { protect, admin, managers } from '../middlewares/authMiddleware.js'

router.route('/').get(getCards).post(protect, managers, createCard)
router.route('/few/:num').get(getFewCards)
router
  .route('/:id')
  .get(getCardById)
  .delete(protect, admin, deleteCard)
  .put(protect, admin, imageMemoryUpload.single('image'), updateCard)

router
  .route('/:id/items')
  .patch(protect, deliverCardItem)
  .put(protect, managers, addCardItem)

router.route('/sold/:cardId/:userId').post(protect, createSoldCard)
router.route('/sold/:userId').get(protect, getMySoldCards)
export default router
