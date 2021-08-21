import mongoose from "mongoose"
import User from "../models/userModels.js"

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    orderItems:
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        newPassword: {
            type: String,
            required: true
        },

    },

    price: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String
        },
        updated_time: {
            type: String
        },
        email: {
            type: String
        }
    },

    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },

}, {
    timestamps: true
})

const JambPasswordResetOrder =
    mongoose.model('JambPasswordResetOrder', orderSchema)

export default JambPasswordResetOrder