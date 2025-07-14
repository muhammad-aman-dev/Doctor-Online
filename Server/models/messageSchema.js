import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First Name is required"]
    },
    lastname:{
        type:String,
        required:[true,"Last Name is required"]
    },
    phone:{
        type:String,
        minlength:[11,"Min Lenght is 11"],
        maxlength:[11,"Max Lenght is 11"],
        required:[true,"Phone is required"]
    },
    nic:{ 
        type:String,
        minlength:[13,"Min Lenght is 13"],
        maxlength:[13,"Max Lenght is 13"],
        required:[true,"Nic is required"]
    },
    patientemail:{
        type:String,
        required:[true,"Email is required"]
    },
    doctoremail:{
      type:String,
      reuired:[true,"Doctor Mail is required"]
    },
    message:{
        type:String,
        required:[true,"Message is Required"] 
    },
    status:{
        type:String,
        default:'pending'
    }
})

export default mongoose.model("Message",messageSchema);