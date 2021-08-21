import asyncHandler from "express-async-handler"
import Contact from "../models/contactModels.js"
import User from "../models/userModels.js"
import { mg, mgOptions, emailMessageCardTemplate, servicesMessageTemplate } from "../utils/sendEmail.js"


//@desc     Create new Contact
//@route    POST /api/contacts
//@access   Public

export const createContact = asyncHandler(async (req, res) => {
    const { name, email, purpose, message: description } = req.body

    const contact = new Contact({
        name,
        email,
        purpose,
        message: description
    })

    const createdContact = await contact.save()

    if (createdContact) {
        const from = email
        const subject = `Message from ${name} for ${purpose}`

        const heading = `${name}'s message for ${purpose}`
        const msg = `<div> <p>${description}</p></div>`

        const message = servicesMessageTemplate(heading, msg)

        const data = mgOptions(from, process.env.ADMIN_EMAIL, subject, message)

        mg.messages().send(data, (error, body) => {
            if (error) {
                throw new Error(error)
            } else {
                res.status(201).send("Message sent")
            }
        })
    }
})

//@desc     GET contact by ID
//@route    GET /api/contacts/:id
//@access   Private/Admin

export const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if (contact) {
        res.send(contact)
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})

//@desc     Get contact by ID
//@route    GET /api/contacts/byemail/:email
//@access   Private/Admin

export const getContactByEmail = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({ email: req.params.email })

    if (contacts) {
        res.send(contacts)
    } else {
        res.status(404)
        throw new Error("Contact not found")
    }
})

//@desc     Get all Contacts
//@route    GET /api/contacts/
//@access   Private/Admin

export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: 'desc' })

    if (contacts) {
        res.send(contacts)
    } else {
        res.status(404)
        throw new Error("No contacts found")
    }
})



// @desc    Delete a contact
// @route   DELETE /api/contacts/:id   
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete an order')
    }

    if (contact) {
        contact.remove()
        res.send("Contact removed")
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})
