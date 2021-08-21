import mongoose from "mongoose"

const serviceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        default: 0.0,
        required: true
    }
})

const Service = mongoose.model('Service', serviceSchema)

export default Service