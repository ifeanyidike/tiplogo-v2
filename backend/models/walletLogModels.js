import mongoose from "mongoose"
import User from "./userModels.js"

const walletLogSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    method:{
        type: String        
    },
    paymentResult:{
        id: {
            type: String, 
            required: true,            
        },
        status:{
            type: String,
            required: true,
        },
        update_time:{
            type: Date,
            required: true
        },
        email:{
            type: String,
            required: true
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,  
    },
    amount:{
        type: Number,
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});


const WalletLog = mongoose.model("WalletLog", walletLogSchema);
export default WalletLog