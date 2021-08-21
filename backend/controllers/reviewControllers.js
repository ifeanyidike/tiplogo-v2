import asyncHandler from "express-async-handler"
import Review from "../models/reviewModels.js"
import User from "../models/userModels.js"

// @desc    Fetch all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res) => {

    const reviews = await Review.find({})
        .populate('user', 'id name profile')
        .sort({ value: 'desc' })

    if (reviews) {
        res.json(reviews)
    } else {
        res.status(404)
        throw new Error("Reviews not found")
    }
})


// @desc    Fetch single review
// @route   GET /api/reviews/:id   
// @access  Public

export const getReviewById = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    if (review) {
        res.json(review)
    } else {
        res.status(404)
        throw new Error("Review not found")
    }
})


// @desc    Fetch single review
// @route   GET /api/reviews/user/
// @access  Public

export const getReviewByUserId = asyncHandler(async (req, res) => {
    const review = await Review.find({ user: req.user._id })

    if (review) {
        res.json(review[0])
    } else {
        res.status(404)
        throw new Error("Review not found")
    }
})



// @desc    Delete a review
// @route   DELETE /api/reviews/:id   
// @access  Private/Admin
export const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    const operatingUser = await User.findById(req.user._id)

    if (!operatingUser.isAdmin) {
        throw new Error('Only admin can delete a review')
    }

    if (review) {

        review.remove()
        res.json({ message: 'Review removed' })
    } else {
        res.status(404)
        throw new Error('Review not found')
    }
})

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private/Admin

export const createReview = asyncHandler(async (req, res) => {
    const usersReview = await Review.find({ user: req.user._id })
    const { value, description } = req.body

    if (!description) {
        throw new Error('Please give us a brief description')
    }

    if (usersReview.length > 0) {
        res.status(401)
        throw new Error("You already left a review")
    }

    const review = new Review({
        value,
        description,
        user: req.user._id,
    })
    const createdReview = await review.save()
    res.status(201).send("Review successfully created")
})

// @desc    Update a review
// @route   PUT /api/reviews
// @access  Private/Admin
export const updateReview = asyncHandler(async (req, res) => {
    const { value, description } = req.body
    const review = await Review.findById(req.params.id)

    if (review) {
        review.value = value || review.name
        review.description = description || review.description

        await review.save()
        res.send("Review updated")

    } else {
        res.status(404)
        throw new Error('Review not found')
    }
})


