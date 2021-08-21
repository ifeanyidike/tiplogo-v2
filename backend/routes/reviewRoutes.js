import express from "express"
const router = express.Router()

import {
    getReviews,
    getReviewById,
    getReviewByUserId,
    deleteReview,
    createReview,
    updateReview,
} from "../controllers/reviewControllers.js"

import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").get(getReviews).post(protect, createReview)

router.route('/user').get(protect, getReviewByUserId)

router.route('/:id').get(getReviewById)
    .delete(protect, admin, deleteReview)
    .put(protect, managers, updateReview)

export default router