import express from "express"
const router = express.Router()

import {
    createJambPasswordResetOrder,
    updateJambPasswordResetOrder,
    getJambPasswordResetOrderById,
    getMyJambPasswordResetOrders,
    adminGetMyJambPasswordResetOrders,
    getJambPasswordResetOrders,
    deleteJambPasswordResetOrder
} from "../controllers/jambPasswordResetControllers.js"

import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").post(protect, createJambPasswordResetOrder)
    .get(protect, managers, getJambPasswordResetOrders)

router.route('/myorders').get(protect, getMyJambPasswordResetOrders)
router.route('/myorders/:userId').get(protect, adminGetMyJambPasswordResetOrders)

router.route("/:id").get(protect, getJambPasswordResetOrderById)
    .delete(protect, admin, deleteJambPasswordResetOrder)
    .put(protect, updateJambPasswordResetOrder)

export default router