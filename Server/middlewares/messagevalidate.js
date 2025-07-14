export const messagevalidate=async(req,res,next)=>{
const {firstname,lastname,phone,nic,patientemail,doctoremail,message}=req.body;
if(!firstname||!lastname||!phone||!nic||!patientemail||!doctoremail||!message){
    return res.status(400).send("Please Give All Details!!!");
}
next()
}