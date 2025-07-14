import Doctor from "../models/doctorSchema.js"

export const getDoctors=async(req,res)=>{
 try{
    let data=await Doctor.find({}).lean();
 let newdata=data.map(original=>{
    const {password,...rest}=original;
    return rest;
 })
 res.send(newdata).status(200)
}
catch(err){
    res.send(err).status(400)
}
} 