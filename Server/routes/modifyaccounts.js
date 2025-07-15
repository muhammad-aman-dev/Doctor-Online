import express from 'express'
import multer from "multer";
import cloudinary from '../config/cloudinaryconfig.js';
import Doctor from '../models/doctorSchema.js';
import User from '../models/userSchema.js';

const storage=multer.memoryStorage();
const upload=multer({storage});

const modifyRouter=express.Router()

modifyRouter.post("/modifyDp",upload.single("photo"),async (req,res)=>{
    try{
    const {email}=req.body;
    const file=req.file;
    if(!email||!file){
        return res.status(400).send("Request Donot Contain the required things");
    }
    const doctor=await Doctor.findOne({email})
    if(!doctor){
        return res.status(400).send("Doctor not found");
    }
    if(doctor.dpURL && doctor.dpURL.includes("/doctor_profiles/")){
        const public_id=doctor.dpURL.split("/").slice(-2).join("/").replace(/\.[^/.]+$/, "");
        try{
   cloudinary.uploader.destroy(public_id);
        }
        catch(err){
          console.log(err)
        }
    }
    const stream=cloudinary.uploader.upload_stream(
        {folder: "doctor_profiles"},async(err,result)=>{
            if(err){
                return res.status(400).send("Upload Failed")
            }
            doctor.dpURL=result.secure_url;
            await doctor.save();
            return res.status(200).send("Uploaded Successfully!!!")
        });
        stream.end(file.buffer);

    }
    catch(err){
  res.status(500).send("Server Error")
  console.log(err)
    }
} )


modifyRouter.post("/modifypassword",async(req,res)=>{
    const {mail,role,password}=req.body;
    if(role=='Patient'||role=='Admin'){
     let find=await User.findOne({email:mail});
     if(!find){
        return res.status(400).send(`${role} with this EMAIL not found`)
     }
     find.password=password;
     await find.save();
     return res.status(200).send('Password Reset Request Successfull!')
    }
    if(role=='Doctor'){
     let find=await Doctor.findOne({email:mail});
     if(!find){
           return res.status(400).send(`${role} with this EMAIL not found`)
    }
    find.password=password;
     await find.save();
     return res.status(200).send('Password Reset Request Successfull!')
    }
})

export default modifyRouter;