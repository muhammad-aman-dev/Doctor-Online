import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:[true,"Email is required"] 
    },
    password:{
        type:String,
        required:[true,"Password Is Required"],
        minlength:[8,"Min length for Password is 8"],
        maxlength:[16,"Max length for Password is 16"]
    },
    role:{
        type:String,
        required:true
    } 
})

userSchema.pre("save",async function (next) { 
    if(!this.isModified("password")){
        next();  
    }
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword=async function (enteredpass) {
    return await bcrypt.compare(enteredpass,this.password);
}

userSchema.methods.generateToken=function(){
    return jwt.sign({email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

export default mongoose.model("User",userSchema);