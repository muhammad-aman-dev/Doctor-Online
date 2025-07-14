import mongoose from "mongoose"

const doctorsrequest= new mongoose.Schema({
    email:{
    type:String,
    reuired:[true,"Email is required!!!"]
    },
    password:{
    type:String,
    reuired:[true,"Password is reuired!!!"]
    },
    fullname:{
        type:String,
        required : [true,"Full Name is required!!!"]
    },
    nic:{
    type:String,
    required:[true,"nic is required!!!"]
    },
    gender:{
        type:String,
        required:[true,"Gender Is Required!!!"]
    },
    dob:{
        type:Date,
        required:[true,"Date Of Birth Required!!!"]
    },
    phone:{
        type:String,
        required:[true,"Phone Number is reuired!!!"]
    },
    clinicaddress:{
        type:String,
        required:[true,"Clinic Address is required!!!"]
    },
    degree:{
        type:String,
        required:[true,"Degree is required"]
    },
    city:{
        type:String,
        required:[true,"City is required!!!"]
    },
    Experience:{
        type:Number,
        required:[true,"experience is required"]
    },
    bio: {
    type: String,
    maxlength: 1000, 
    default: ''
  }
})

export default mongoose.model("doctorsrequest",doctorsrequest);