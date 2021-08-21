import express from "express"
const router = express.Router()

import {
    addCardOrderItems,
    getCardOrderById,
    updateCardOrderWithoutPay,
    updateCardOrderToPaid,
    updateCardOrderToDelivered,
    getMyCardOrders,
    getCardOrders,
    getMyNotPaidCardOrders,
    deleteOrder
} from "../controllers/cardOrderControllers.js"

import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").post(protect, addCardOrderItems)
    .get(protect, managers, getCardOrders)

router.route('/myorders').get(protect, getMyCardOrders)

router.route("/:id")
    .get(protect, getCardOrderById)
    .delete(protect, admin, deleteOrder)

router.route("/:id/notpaid").get(protect, getMyNotPaidCardOrders)

router.route("/:id/update").patch(protect, updateCardOrderWithoutPay)

router.route("/:id/pay").put(protect, updateCardOrderToPaid)
router.route("/:id/deliver").put(protect, updateCardOrderToDelivered)

export default router