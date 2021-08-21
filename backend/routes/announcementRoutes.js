import express from 'express'
const router = express.Router()
//import controllers
import {
  getAnnouncement,
  updateAnnouncement,
} from '../controllers/announcementControllers.js'
import { protect, admin, managers } from '../middlewares/authMiddleware.js'

router
  .route('/')
  .get(getAnnouncement)
  .post(protect, managers, updateAnnouncement)

export default router
