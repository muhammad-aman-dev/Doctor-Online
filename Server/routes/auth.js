import express from "express"
import { signup } from "../controllers/usersignup.js"
import { login } from "../controllers/usersignup.js"
import { validate } from "../middlewares/uservalidate.js"
import { getdetails } from "../controllers/usersignup.js"
import { validatedoctor } from "../middlewares/uservalidate.js"
import { doctorsignup } from "../controllers/usersignup.js"
import { validatelogin } from "../middlewares/uservalidate.js"
import { RequestDoc } from "../controllers/usersignup.js"
import { logout } from "../controllers/userLogout.js"
import { requests } from "../controllers/requestsList.js"
import { getDoctors } from "../controllers/getallDoctors.js";
import { deldoc } from "../controllers/requestsList.js"
import { transportmail } from "../controllers/usersignup.js"
import { getdetailsdoctor } from "../controllers/usersignup.js"

const router=express.Router()
 
router.post("/signup",validate,signup)
router.post("/login", validatelogin,login) 
router.get("/getdetails", getdetails) 
router.get("/getdetailsdoctor", getdetailsdoctor) 
router.post("/doctor-register",validatedoctor,doctorsignup)
router.post("/doctorrequest",validatedoctor,RequestDoc)
router.post("/logout",logout)
router.get("/doctorsreqlist",requests)
router.get("/getDoctors",getDoctors); 
router.post("/deldoc",deldoc)
router.post("/sendotp",transportmail) 


export default router;   