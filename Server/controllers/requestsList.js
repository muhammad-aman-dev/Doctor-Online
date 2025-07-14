import doctorsrequest from "../models/doctorsrequest.js"


export const requests=async (req,res)=>{
     try{
    let list=await doctorsrequest.find({})
    return res.status(200).send(list);
}
catch(err){
    console.log(err);
}
}

export const deldoc=async (req,res)=>{
    let {email}=req.body;
    try{

        let req=await doctorsrequest.deleteOne({email})
        return res.status(200).send('Deleted!!!!')
    }
    catch(err){
        return res.status(400).send('No Doctor Found')
    }
}