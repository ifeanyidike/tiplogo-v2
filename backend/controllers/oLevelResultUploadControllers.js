import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import OLevelResultUploadOrder from "../models/oLevelResultUploadModels.js"
import User from "../models/userModels.js"
import request from "request"
import fs from "fs"
import { mg, mgOptions, servicesMessageTemplate, mgOptionsWithAttachment } from "../utils/sendEmail.js"
import { uploader } from "cloudinary"


//@desc     Create new OLevelResultUpload
//@route    POST /api/olevelresultupload
//@access   Private
export const createOLevelResultUploadOrder = asyncHandler(async (req, res) => {
    const {
        type, name, profileCode, price, schoolAttended, schoolType,
        subjectUpload, paymentMethod, paymentResultId,
        paymentResultStatus, paymentResultUpdateTime, paymentResultEmail
    }
        = req.body

    if (!req.files || req.files.length === 0) {
        throw new Error('No file supplied')
    }

    let upload = []


    for (let file of req.files) {

        const result = await uploader.upload(file.path)

        const objectToPush = {
            cloudinary_id: result.public_id,
            image: result.secure_url
        }
        upload.push(objectToPush)

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(err)
                return
            }
            //file removed
        })
    }

    // if (card.upload.cloudinary_id) {
    //     await cloudinary.uploader.destroy(card.upload.cloudinary_id);
    // }
    if (!type || !name || !profileCode) {
        throw new Error('No order items or order items are incomplete')
    }

    const from = "noreply@pincafes.com"
    const subject = "O Level Result Upload Order"

    const heading = `Your O Level Result Upload Order`
    const msg = `<div> 
        <p>Thank you for placing an order for O'Level Result Upload. </p>
        <p>Check back in few hours. We'll get back to you shortly. </p>
    </div>`

    const message = servicesMessageTemplate(heading, msg)
    const data = mgOptions(from, req.user.email, subject, message)

    const order = new OLevelResultUploadOrder({
        orderItems: {
            type,
            name,
            profileCode,
            schoolAttended,
            schoolType,
            files: upload,
            subjectUpload: JSON.parse(subjectUpload)
        },
        user: req.user._id,
        price,
        paymentMethod,
        paymentResult: {
            id: paymentResultId,
            status: paymentResultStatus,
            updated_time: paymentResultUpdateTime,
            email: paymentResultEmail
        },
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

})


//@desc     GET OLevelResultUpload by ID
//@route    GET /api/olevelresultupload/:id
//@access   Private
export const getOLevelResultUploadOrderById = asyncHandler(async (req, res) => {
    const order =
        await OLevelResultUploadOrder.findById(req.params.id)
            .populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc     GET bloob admin upload by ID
//@route    GET /api/olevelresultupload/:id/blob
//@access   Private

export const getOLevelResultUploadBlobById = asyncHandler(async (req, res) => {
    const order = await OLevelResultUploadOrder.findById(req.params.id)

    if (order) {
        const file = fs.createReadStream(order.admin_upload)

        file.pipe(res)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})




//@desc     Get logged in user OLevelResultUploads
//@route    GET /api/olevelresultupload/myorders
//@access   Private
export const getMyOLevelResultUploadOrders = asyncHandler(async (req, res) => {
    const orders = await OLevelResultUploadOrder.find({ user: req.user._id }).sort({ createdAt: 'desc' })
    res.json(orders)
})

//@desc     Get all OLevel Result Uploads
//@route    GET /api/olevelresultuploads/
//@access   Private/Admin
export const getOLevelResultUploadOrders = asyncHandler(async (req, res) => {
    const orders = await OLevelResultUploadOrder.find({})
        .populate('user', 'id name')
        .sort({ createdAt: 'desc' })
    res.json(orders)
})


export const adminGetMyOLevelResultUploadOrders = asyncHandler(async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId
    const objId = new ObjectId(req.params.userId)

    const order = await OLevelResultUploadOrder.find({ user: objId })

    if (order) {
        res.send(order)
    } else {
        throw new Error("Order does not exist")
    }
})


//@desc     Delete a O level result upload
//@route    DELETE /api/olevelresultupload/:id
//@access   Private/Admin

export const deleteOLevelResultUploadOrder = asyncHandler(async (req, res) => {
    const order = await OLevelResultUploadOrder.findById(req.params.id)

    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete an order')
    }

    if (order) {

        if (order.admin_upload.cloudinary_id) {
            await uploader.destroy(order.admin_upload.cloudinary_id);
        }

        for (let file of order.orderItems.files) {
            if (file.cloudinary_id) {
                await uploader.destroy(file.cloudinary_id);
            }
        }

        order.remove()

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})



export const adminOLevelResultUploadFileUpload = asyncHandler(async (req, res) => {
    const order = await OLevelResultUploadOrder.findById(req.params.id).populate('user', 'id email')

    if (order) {

        const from = "noreply@pincafes.com"
        const subject = "O level result upload completed"

        const heading = `We have completed your o level result upload`
        const msg = `<div> 
            <p>Thank you for ordering your change of O level result upload with us </p>
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
                        res.send(result.secure_url)
                    }
                })
            }
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})