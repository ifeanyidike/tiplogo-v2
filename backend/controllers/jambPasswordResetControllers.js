import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import JambPasswordResetOrder from "../models/jambPasswordResetModels.js"
import User from "../models/userModels.js"
import { mg, mgOptions, servicesMessageTemplate } from "../utils/sendEmail.js"

//@desc     Create new jambpasswordreset
//@route    POST /api/jambpasswordreset
//@access   Private

export const createJambPasswordResetOrder = asyncHandler(async (req, res) => {
    const { orderItems, price, paymentMethod, paymentResult } = req.body

    if (!orderItems) {
        throw new Error('No order items')
    }

    if (!paymentResult) {
        throw new Error('No payment result')
    }

    if (orderItems && orderItems.length === 0) {
        throw new Error('No Order items')
    } else {
        const from = "noreply@pincafes.com"
        const subject = "Jamb Password Reset Order"

        const heading = `Your Jamb Password Reset Order`
        const msg = `<div> 
            <p>Thank you for placing an order for Jamb password reset order. </p>
            <p>Check back in few hours. We'll get back to you shortly. </p>
        </div>`

        const message = servicesMessageTemplate(heading, msg)
        const data = mgOptions(from, req.user.email, subject, message)

        const order = new JambPasswordResetOrder({
            orderItems,
            user: req.user._id,
            price,
            paymentMethod,
            paymentResult,
            isPaid: true,
            paidAt: Date.now()
        })
        const createdOrder = await order.save()
        if (createdOrder) {
            mg.messages().send(data, (error, body) => {
                if (error) {
                    throw new Error('An error occurred when sending email')
                } else {
                    res.status(201).json(createdOrder)
                }
            })
        }
    }
})


//@desc     Create new jambpasswordreset
//@route    PUT /api/jambpasswordreset
//@access   Private

export const updateJambPasswordResetOrder = asyncHandler(async (req, res) => {
    const { orderItems } = req.body

    if (!orderItems) {
        throw new Error('No order items')
    }

    if (orderItems && orderItems.length === 0) {
        throw new Error('No Order items')
    } else {
        const order = new JambPasswordResetOrder({
            orderItems
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})



//@desc     GET jambpasswordreset by ID
//@route    GET /api/jambpasswordreset/:id
//@access   Private

export const getJambPasswordResetOrderById = asyncHandler(async (req, res) => {
    const order =
        await JambPasswordResetOrder.findById(req.params.id)
            .populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc     Get logged in user Jamb Change Orders
//@route    GET /api/jambpasswordreset/myorders
//@access   Private

export const getMyJambPasswordResetOrders = asyncHandler(async (req, res) => {
    const orders = await JambPasswordResetOrder.find({ user: req.user._id }).sort({ createdAt: 'desc' })
    res.json(orders)
})

//@desc     Get all Jamb Change Orders
//@route    GET /api/jambpasswordreset/
//@access   Private/Admin

export const getJambPasswordResetOrders = asyncHandler(async (req, res) => {
    const orders = await JambPasswordResetOrder.find({})
        .populate('user', 'id name')
        .sort({ createdAt: 'desc' })
    res.json(orders)
})

//@desc     Delete a Jamb password reset
//@route    DELETE /api/jambpasswordreset/
//@access   Private/Admin

export const deleteJambPasswordResetOrder = asyncHandler(async (req, res) => {
    const order = await JambPasswordResetOrder.findById(req.params.id)

    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete an order')
    }

    if (order) {
        order.remove()
        res.json({ message: 'order removed' })
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

    res.json(orders)
})

export const adminGetMyJambPasswordResetOrders = asyncHandler(async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId
    const objId = new ObjectId(req.params.userId)

    const order = await JambPasswordResetOrder.find({ user: objId })

    if (order) {
        res.send(order)
    } else {
        throw new Error("Order does not exist")
    }


})