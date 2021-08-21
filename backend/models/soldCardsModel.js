import mongoose from "mongoose"
import User from "./userModels.js";
import Card from "./cardModels.js";

const soldCardSchema = mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,  
    },
    card:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Card,  
    },
    name:{
        type: String,
        required: true
    },
    pin:{
        type: String
    },
    serialNo:{
        type: String
    },
    token:{
        type: String
    },    
    price:{
        type: Number,
        required: true,
        default: 0
    },   
    image:{
        type: String,
        required: true
    },     
      
}, {
    timestamps: true
});

const SoldCard = mongoose.model("SoldCard", soldCardSchema)

export default SoldCard