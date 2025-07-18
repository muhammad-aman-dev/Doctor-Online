import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config(); // make sure env variables are loaded

const DEFAULT_DP_URL = process.env.Default_DP;

const doctorSchema= new mongoose.Schema({
    email:{
    type:String,
    required:[true,"Email is required!!!"]
    }, 
    password:{
    type:String,
    required:[true,"Password is reuired!!!"]
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
  },
  role:{
    type:String,
    required:[true,"role is required"]
  },
  dpURL:{
    type:String,
    default: DEFAULT_DP_URL
  }
})

doctorSchema.pre("save",async function (next){
if(!this.isModified("password")){
    next();
}
this.password=await bcrypt.hash(this.password,10);
})

doctorSchema.methods.comparePassword=async function (enteredpass){
    return await bcrypt.compare(enteredpass,this.password);
}

doctorSchema.methods.generateToken=function(){
    return jwt.sign({email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE  
    })
}   

export default mongoose.model("Doctors",doctorSchema); 