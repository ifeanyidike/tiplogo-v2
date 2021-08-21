import mongoose from "mongoose"

const schoolSchema = mongoose.Schema({
    programme: {
        type: String, 
        required: true
    },
    institution:{
        type: String,
        required: true
    },
    courses:[
        String
    ]
}, {
    timestamps: true
})

const School = mongoose.model('School', schoolSchema);

export default School;