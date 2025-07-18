import Doctor from "../models/doctorSchema.js"

export const getDoctors=async(req,res)=>{
 try{
    let data=await Doctor.find({}).lean();
 let newdata=data.map(original=>{
    const {password,...rest}=original;
    return rest;
 })
 res.status(200).send(newdata)
}
catch(err){
    res.status(400).send(err)
}
} 
