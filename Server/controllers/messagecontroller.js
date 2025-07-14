import messageSchema from "../models/messageSchema.js"

export const messagecontrol=async(req,res)=>{
const {firstname,lastname,phone,nic,patientemail,doctoremail,message}=req.body;
const patientrequest=new messageSchema({firstname,lastname,phone,nic,patientemail,doctoremail,message});
await patientrequest.save();
return res.status(200).send("Message Sent Successfully!!!");
}    

export const getmessages=async(req,res)=>{
    const {patientemail}=req.body;
    let message=await messageSchema.find({patientemail})
    if(message){
        res.status(200).send(message);
    } 
    else{
        res.status(400).send("No messages found!");
    }
}
export const doctormessages=async(req,res)=>{
    const {doctoremail}=req.body;
    let message=await messageSchema.find({doctoremail,status:'pending'})
    if(message){
        res.status(200).send(message);
    } 
    else{
        res.status(400).send("No messages found!");
    }
}

export const deletemessage=async(req,res)=>{
    const {_id}=req.body;
    let message=await messageSchema.deleteOne({_id}).then(()=>res.status(200).send("Deleted Successfully")).catch(()=>res.status(400).send("Deletion Failed"))
}

export const modifymessage=async(req,res)=>{ 
    const {_id,status}=req.body;
    let message=await messageSchema.findOne({_id});
    if(message){
        message.status=status;
        await message.save();
        return res.status(200).send('Status Updated Successfully!!!');
    }
    if(!message){
        return res.status(400).send('No message found!!!')
    }
}