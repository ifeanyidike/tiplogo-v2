import WalletLog from "../models/walletLogModels.js"
import User from "../models/userModels.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import { mg, mgOptions, servicesMessageTemplate, mgOptionsWithAttachment } from "../utils/sendEmail.js"
import { uploader } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

// @desc    Update user profile
// @route   PUT /api/users/profile/update
// @access  Private

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id)
    const { name, email, profile, password } = req.body.user

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.profile = profile || user.profile

        if (password) {
            user.password = password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            type: updatedUser.type,
            isAdmin: updatedUser.isAdmin,
            isEditor: updatedUser.isEditor,
            token: generateToken(updatedUser._id),
            // wallet: updatedUser.wallet,
            profile: updatedUser.profile
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Get user's wallet amount
// @route   GET /api/users/wallet
// @access  Private

export const getWalletAmount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.send(`${user.wallet}`)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})




// @desc    Debit money from wallet
// @route   PUT /api/users/wallet/debit
// @access  Private

export const debitWallet = asyncHandler(async (req, res) => {

    const { id, amount, paymentResult } = req.body
    const user = await User.findById(id)

    if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
    }

    if (user) {
        const balance = parseInt(user.wallet) - parseInt(amount)

        if (balance > 0) {

            user.wallet = balance

            const updatedUser = await user.save()

            if (updatedUser) {
                const walletlog = new WalletLog({
                    type: 'debit',
                    method: 'local',
                    paymentResult,
                    user: user._id,
                    amount: parseInt(amount),
                    balance: parseInt(balance)
                })
                await walletlog.save()
            }

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                type: updatedUser.type,
                isAdmin: updatedUser.isAdmin,
                isEditor: updatedUser.isEditor,
                token: generateToken(updatedUser._id),
                // wallet: updatedUser.wallet,
                profile: updatedUser.profile
            })
        } else {
            res.status(401)
            throw new Error('You dont have sufficient amount for this transaction.')
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export const creditWallet = asyncHandler(async (req, res) => {
    const { id, amount, paymentResult, method } = req.body
    const user = await User.findById(id)

    if (user) {
        user.wallet += parseInt(amount)
        const updatedUser = await user.save()

        if (updatedUser) {
            const walletlog = new WalletLog({
                type: 'credit',
                method,
                paymentResult,
                user: user._id,
                amount: parseInt(amount),
                balance: user.wallet
            })
            await walletlog.save()
        }

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            type: updatedUser.type,
            isAdmin: updatedUser.isAdmin,
            isEditor: updatedUser.isEditor,
            token: generateToken(updatedUser._id),
            // wallet: updatedUser.wallet,
            profile: updatedUser.profile
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



// @desc    GET all users
// @route   GET /api/users/
// @access  Private/Admin

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if (users) {
        res.status(200).send(users)
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

// @desc    GET a  user profile
// @route   GET /api/users/:id
// @access  Private/Admin

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.status(200).send(user)
    } else {
        res.status(404)
        throw new Error('No users found')
    }
})

// @desc    DELETE a user
// @route   GET /api/users/delete/:id
// @access  Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete a user')
    }

    if (user && user.isAdmin) {
        throw new Error("You cant delete an admin user. Contact central support")
    }

    if (user) {
        if (user.profile.cloudinary_id) {
            await uploader.destroy(user.profile.cloudinary_id);
        }
        user.delete()
    } else {
        throw new Error('User not found')
    }

})

// @desc    PUT make a user an admin
// @route   GET /api/users/:id/admin
// @access  Private/Admin

export const makeAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)
    const { adminStatus } = req.body

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can make or remove an admin')
    }

    if (user) {
        user.isAdmin = adminStatus
        await user.save()
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    PUT make a user an editor
// @route   GET /api/users/:id/editor
// @access  Private/Admin

export const makeEditor = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)
    const { editorStatus } = req.body

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can make or remove an editor')
    }

    if (user) {
        user.isEditor = editorStatus
        await user.save()
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    POST send email to a user by email (also send to admin)
// @route   POST /api/users/email/:email
// @access  Private/Admin

export const emailAUserByEmail = asyncHandler(async (req, res) => {
    const users = await User.find({ email: req.params.email })
    const { subject, message: info } = req.body

    const from = "noreply@pincafes.com"
    const [user] = users

    const recipients = [user.email, process.env.ADMIN_EMAIL]
    const heading = `Hi ${user.name}`
    const msg =
        `<div> 
            <p>${info}</p>            
        </div>`

    const message = servicesMessageTemplate(heading, msg)
    const data = mgOptions(from, recipients, subject, message)

    if (user) {
        mg.messages().send(data, (error, body) => {
            if (error) {
                throw new Error('An error occurred when sending email')
            } else {
                res.status(200).send("Email sent")
            }
        })
    } else {
        res.status(404)
        throw new Error("Email does not exist in the database")
    }
})



// @desc    POST send email to a user (also send to admin)
// @route   POST /api/users/:id/email
// @access  Private/Admin

export const emailAUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const { subject, message: info } = req.body

    if (!subject || !info) {
        throw new Error('Subject or message cannot be empty')
    }
    const from = "noreply@pincafes.com"
    const recipients = [user.email, process.env.ADMIN_EMAIL]
    const heading = `Hi ${user.name}`
    const msg =
        `<div> 
            <p>${info}</p>            
        </div>`

    const message = servicesMessageTemplate(heading, msg)
    const data = mgOptions(from, recipients, subject, message)

    if (user) {
        mg.messages().send(data, (error, body) => {
            if (error) {
                throw new Error('An error occurred when sending email')
            } else {
                res.status(200).send("Email sent")
            }
        })
    }
})


// @desc    POST email all users (also send to admin)
// @route   POST /api/users/email
// @access  Private/Admin

export const emailAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    const { subject, message: info } = req.body

    if (!subject || !info) {
        throw new Error('Subject or message cannot be empty')
    }

    const from = "noreply@pincafes.com"
    const recipients = users.map(user => user.email)

    const heading = `Dear valued customer,`
    const msg =
        `<div> 
            <p>${info}</p>            
        </div>`

    const message = servicesMessageTemplate(heading, msg)
    const data = mgOptions(from, recipients, subject, message)

    if (users) {
        mg.messages().send(data, (error, body) => {
            if (error) {
                throw new Error('An error occurred when sending email')
            } else {
                res.status(200).send("Email sent")
            }
        })
    }
})

// @desc    PUT add a profile photo (also send to admin)
// @route   POST /api/users/:id/profilephoto
// @access  Private

export const addProfilePhoto = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        // const attachment = request(req.file.path)
        const from = "noreply@pincafes.com"
        const subject = "Profile Picture Changed"

        const heading = `Hi ${user.name}`
        const msg = `<div> 
            <p>You just changed your profile picture </p>            
        </div>`

        const message = servicesMessageTemplate(heading, msg)

        const result = await uploader.upload(req.file.path)

        if (result) {
            user.profile.picture = result.secure_url
            user.profile.cloudinary_id = result.public_id

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })

            const data = {
                from,
                to: user.email,
                subject,
                html: message
            };

            const updatedUser = await user.save()
            if (updatedUser) {
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
        throw new Error('User not found')
    }
})

