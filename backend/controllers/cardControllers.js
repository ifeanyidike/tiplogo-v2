import asyncHandler from "express-async-handler"
import Card from "../models/cardModels.js"
import User from "../models/userModels.js"
import { uploader } from 'cloudinary'
import fs from "fs"
// import {mg, mgOptions, emailMessageCardTemplate} from "../utils/sendEmail.js"

// @desc    Fetch all cards
// @route   GET /api/cards
// @access  Public
export const getCards = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Card.countDocuments({ ...keyword })
    const cards = await Card.find({ ...keyword })
        .sort({ createdAt: 'asc' })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ cards, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch few cards
// @route   GET /api/cards/${num}
// @access  Public

export const getFewCards = asyncHandler(async (req, res) => {
    const num = req.params.num
    const cards = await Card.find({})
        .limit(parseInt(num))
        .sort({ createdAt: 'asc' })

    res.json({ cards: cards })
})

// @desc    Fetch single card
// @route   GET /api/cards/:id   
// @access  Public

export const getCardById = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id)

    if (card) {
        res.json(card)
    } else {
        res.status(404)
        throw new Error("Card not found")
    }
})

// @desc    Delete a card
// @route   DELETE /api/cards/:id   
// @access  Private/Admin
export const deleteCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete an order')
    }

    if (card) {
        if (card.upload.cloudinary_id) {
            await uploader.destroy(card.upload.cloudinary_id);
        }

        card.remove()
        res.json({ message: 'Card removed' })
    } else {
        res.status(404)
        throw new Error('Card not found')
    }
})

// @desc    Create a card
// @route   POST /api/cards
// @access  Private/Admin

export const createCard = asyncHandler(async (req, res) => {
    const card = new Card({
        name: 'Sample card',
        price: 0,
        user: req.user._id,
        upload: {
            image: '/images/sample.png'
        },
        description: 'This is a sample card and would soon be updated'
    })
    const createdCard = await card.save()
    res.status(201).json(createdCard)
})

// @desc    Update a card
// @route   PUT /api/cards
// @access  Private/Admin
export const updateCard = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body
    const card = await Card.findById(req.params.id)

    if (card) {
        const result = req.file && await uploader.upload(req.file.path)
        card.name = name || card.name
        card.price = price || card.price
        card.description = description || card.description

        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file removed
            })
        }

        card.upload = result ? {
            cloudinary_id: result.public_id,
            image: result.secure_url
        } : card.upload

        const updatedCard = await card.save()
        res.json(updatedCard)


    } else {
        res.status(404)
        throw new Error('Card not found')
    }
})


// @desc    Add a card item
// @route   PUT /api/cards/item
// @access  Private/Admin
export const addCardItem = asyncHandler(async (req, res) => {
    const { items } = req.body
    const card = await Card.findById(req.params.id)

    if (card) {
        card.items.push(items)

        const updatedCard = await card.save()
        res.json(updatedCard)
    } else {
        res.status(404)
        throw new Error('Card not found')
    }
})


// @desc    deliver card items and remove it
// @route   GET /api/cards/item
// @access  Private
export const deliverCardItem = asyncHandler(async (req, res) => {

    const { numItems } = req.body

    const card = await Card.findById(req.params.id)

    if (card && card.items.length === 0) {
        res.status(404)
        throw new Error(`${card.name} is out of stock`)
    }

    if (card && card.items.length > 0 && card.items.length < parseInt(numItems)) {
        res.status(401)
        throw new Error(`Reduce card quantity. We have only ${card.items.length} in stock`)
    }

    if (card) {
        // const cardItems = await card.items.limit(parseInt(numItems))
        let purchasedItems = card.items
        let remaining = purchasedItems.splice(parseInt(numItems))

        card.items = remaining
        await card.save()


        res.status(201).json({
            purchasedItems
        })

    } else {
        res.status(404)
        throw new Error('Card not found')
    }
})
