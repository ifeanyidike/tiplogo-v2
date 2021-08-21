import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import ChangeOfCourseInstitutionOrder from "../models/jambChangeModels.js"
import User from "../models/userModels.js"
import { mg, mgOptions, servicesMessageTemplate, mgOptionsWithAttachment } from "../utils/sendEmail.js"
import request from "request"
import fs from "fs"
import { uploader } from 'cloudinary'


//@desc     Create new changeofcourseinstitution
//@route    POST /api/changeofcourseinstitution
//@access   Private

export const createChangeOfCourseInstitutionOrder = asyncHandler(async (req, res) => {
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
        const subject = "Jamb Change of Course and Institution Order"

        const heading = `Your Change of Course and Institution Order`
        const msg = `<div> 
            <p>Thank you for placing an order for Jamb change of course/institution. </p>
            <p>Check back in few hours. We'll get back to you shortly. </p>
        </div>`

        const message = servicesMessageTemplate(heading, msg)
        const data = mgOptions(from, req.user.email, subject, message)

        const order = new ChangeOfCourseInstitutionOrder({
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


//@desc     Create new changeofcourseinstitution
//@route    PUT /api/changeofcourseinstitution
//@access   Private

export const updateChangeOfCourseInstitutionOrder = asyncHandler(async (req, res) => {
    const { orderItems } = req.body

    if (!orderItems) {
        throw new Error('No order items')
    }

    if (orderItems && orderItems.length === 0) {
        throw new Error('No Order items')
    } else {
        const order = new ChangeOfCourseInstitutionOrder({
            orderItems
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})



//@desc     GET changeofcourseinstitution by ID
//@route    GET /api/changeofcourseinstitution/:id
//@access   Private

export const getChangeOfCourseInstitutionOrderById = asyncHandler(async (req, res) => {
    const order =
        await ChangeOfCourseInstitutionOrder.findById(req.params.id)
            .populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc     GET bloob admin upload by ID
//@route    GET /api/changeofcourseinstitution/:id/blob
//@access   Private

export const getChangeOfCourseBlobById = asyncHandler(async (req, res) => {
    const order = await ChangeOfCourseInstitutionOrder.findById(req.params.id)

    if (order) {
        const file = fs.createReadStream(order.admin_upload)

        file.pipe(res)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc     Get logged in user Jamb Change Orders
//@route    GET /api/changeofcourseinstitution/myorders
//@access   Private

export const getMyChangeOfCourseInstitutionOrders = asyncHandler(async (req, res) => {
    const orders = await ChangeOfCourseInstitutionOrder.find({ user: req.user._id }).sort({ createdAt: 'desc' })
    res.json(orders)
})

//@desc     Get all Jamb Change Orders
//@route    GET /api/changeofcourseinstitution/
//@access   Private/Admin

export const getChangeOfCourseInstitutionOrders = asyncHandler(async (req, res) => {
    const orders = await ChangeOfCourseInstitutionOrder.find({})
        .populate('user', 'id name')
        .sort({ createdAt: 'desc' })
    res.json(orders)
})

//@desc     Get all Jamb Change Orders
//@route    GET /api/changeofcourseinstitution/
//@access   Private/Admin

export const deleteChangeOfCourseInstitutionOrder = asyncHandler(async (req, res) => {
    const order = await ChangeOfCourseInstitutionOrder.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete an order')
    }

    if (order) {
        if (order.admin_upload.cloudinary) {
            await uploader.destroy(order.admin_upload.cloudinary_id);
        }

        order.remove()

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export const adminGetMyChangeOfCourseOrders = asyncHandler(async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId
    const objId = new ObjectId(req.params.userId)

    const order = await ChangeOfCourseInstitutionOrder.find({ user: objId })
    if (order) {
        res.send(order)
    } else {
        throw new Error("Order does not exist")
    }
})

export const adminChangeOfCourseFileUpload = asyncHandler(async (req, res) => {
    const order = await ChangeOfCourseInstitutionOrder.findById(req.params.id).populate('user', 'id email')

    if (order) {
        // const attachment = request(req.file.path)
        const from = "noreply@pincafes.com"
        const subject = "Change of course completed"

        const heading = `We have completed your change of course`
        const msg = `<div> 
            <p>Thank you for ordering your change of course/institution with us </p>
            <p>We have successfully completed the process. Find the attached file below </p>
            <p>You can also find it in your profile in our website.  </p>

        </div>`

        const message = servicesMessageTemplate(heading, msg)

        const result = await uploader.upload(req.file.path)
        if (result) {
            order.admin_upload.cloudinary_id = result.public_id
            order.admin_upload.image = result.secure_url

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })

            const data = {
                from,
                to: order.user.email,
                subject,
                html: message,
                attachment: request(result.secure_url)
            };

            const updatedOrder = await order.save()
            if (updatedOrder) {
                mg.messages().send(data, (error, body) => {
                    if (error) {
                        throw new Error('An error occurred when sending email')
                    } else {
                        res.json(result.secure_url)
                    }
                })
            }
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})



