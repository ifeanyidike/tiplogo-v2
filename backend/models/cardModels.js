import mongoose from "mongoose"
import User from "./userModels.js";

const cardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    name: {
        type: String,
        required: true
    },
    items: [
        {
            pin: {
                type: String
            },
            serialNo: {
                type: String
            },
            token: {
                type: String
            }
        }
    ],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    upload: {
        cloudinary_id: {
            type: String
        },
        image: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
    }

}, {
    timestamps: true
});

const Card = mongoose.model("Card", cardSchema)

export default Card