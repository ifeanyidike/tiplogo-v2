import mongoose from 'mongoose'
import User from "./userModels.js";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export default Review