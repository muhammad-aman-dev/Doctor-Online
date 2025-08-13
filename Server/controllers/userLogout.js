export const logout = async (req, res) => {
  const options = {
    path: "/",             
    httpOnly: true,        
    sameSite: "Lax",       
    secure: true,         
  }; 

  res.clearCookie("adminToken", options);
  res.clearCookie("patientToken", options);
  res.clearCookie("doctorToken", options);

  res.status(200).send("Logged Out");   
}; 
