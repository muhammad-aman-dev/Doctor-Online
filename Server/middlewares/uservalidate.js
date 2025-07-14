export const validate=async (req,res,next) => {
    if(!req.body){
        return res.status(400).send("Please fill full Form")
    }
    const {firstname,lastname,phone,nic,email,password,role}=req.body;
    if(!firstname||!lastname||!email||!phone||!nic||!email||!password||!role){
        return res.status(400).send("Please fill full Form")
    }
    next()
}

export const validatedoctor=async(req,res,next)=>{
    if(!req.body){
        return res.status(400).send("Please fill full Form")
    }
    const {email,password,fullname,nic,gender,dob,phone,clinicaddress,degree,city,Experience,bio}=req.body;
    if(!email||!password||!fullname||!nic||!gender||!dob||!phone||!clinicaddress||!degree||!city||!Experience||!bio){
        return res.status(400).send("Please fill full Form")
    }
    next()
}

export const validatelogin=async(req,res,next)=>{
    if(!req.body){  
        return res.status(400).send("Please fill full Form")
    }
    const {email,password,role}=req.body;
    if(!email||!password||!role){
        return res.status(400).send("Please fill full Form")
    }
    next();
}