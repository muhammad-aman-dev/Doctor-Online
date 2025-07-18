export const generateCookie= (user,status,message,res) => {
    let cookieName;
    let Token=user.generateToken();
    if(user.role=="admin"){
    cookieName="adminToken";
    }
    if(user.role=="patient"){
        cookieName="patientToken"
    }
    if(user.role=="doctor"){
        cookieName="doctorToken"
    }
   res.status(status).cookie(cookieName,Token,{
    httpOnly:true,
    expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
    path: "/",             // must match   
    sameSite: "None",       // must match
    secure: true,   
   }).send(message);
}   
