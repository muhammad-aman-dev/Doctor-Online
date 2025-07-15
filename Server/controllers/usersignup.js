import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import validator from "email-validator";
import Doctor from "../models/doctorSchema.js";
import { generateCookie } from "../getcookie/cookie.js";
import doctorrequest from "../models/doctorsrequest.js";
import nodemailer from "nodemailer";
import logs from "../models/logs.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const signup = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, nic, email, password, role } = req.body;
    const existinguser = await User.findOne({ email });
    if (!validator.validate(email)) {
      return res.status(400).send("Email Format Not Matched");
    }
    if (existinguser) {
      return res.status(400).send("USER ALREADY EXISTS");
    }
    const user = new User({
      firstname,
      lastname,
      phone,
      nic,
      email,
      password,
      role,
    });
    await user.save();
    generateCookie(user, 200, "Registered Successfully!!!", res);
  } catch (err) {
    next(err);
  }
};

export const doctorsignup = async (req, res, next) => {
  try {
    let role = "doctor";
    const {
      email,
      password,
      fullname,
      nic,
      gender,
      dob,
      phone,
      clinicaddress,
      degree,
      city,
      Experience,
      bio,
    } = req.body;
    const existingdoctor = await Doctor.findOne({ email });
    if (existingdoctor) {
      return res.status(400).send("Doctor Already exists");
    }
    const doctor = new Doctor({
      email,
      password,
      fullname,
      nic,
      gender,
      dob,
      phone,
      clinicaddress,
      degree,
      city,
      Experience,
      bio,
      role,
    });
    await doctor.save();
    res.status(200).send("Doctor Added Successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).send("please Enter Full Form!!!");
  }
  if (role === "admin" || role === "patient") {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("No User with this email exists!!!");
    }
    let ispassword = await user.comparePassword(password);
    if (!ispassword) {
      return res.status(400).send("Password did'nt match!!!");
    }
    let isrole = user.role;
    if (role != isrole) {
      return res.status(400).send("User with this Role did'nt found!!!");
    }
    generateCookie(user, 200, "Login Successfull!!!", res);
  }
  if (role === "doctor") {
    let doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("No Doctor with this email exists!!!");
    }
    let ispassword = await doctor.comparePassword(password);
    if (!ispassword) {
      return res.status(400).send("Password did'nt match!!!");
    }
    let isrole = doctor.role;
    if (role != isrole) {
      return res.status(400).send("User with this Role did'nt found!!!");
    }
    generateCookie(doctor, 200, "Login Successfull", res);
  }
};

export const getdetails = async function (req, res) {
  let cookieName = req.query.cookieName;
  let token = req.cookies[cookieName];
  if (!token) {
    return res.status(400).send("No Logged IN Detected...");
  }
  let data;
  try {
    data = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(400).send("Invalid Or Expired Token!!!!!");
  }
  if (req.cookies.adminToken || req.cookies.patientToken) {
    let user = await User.findOne({ email: data.email });
    return res.status(200).send(user);
  }
  if (req.cookies.doctorToken) {
    let doctor = await Doctor.findOne({ email: data.email });
    return res.status(200).send(doctor);
  }
};

export const RequestDoc = async function (req, res) {
  try {
    const {
      email,
      password,
      fullname,
      nic,
      gender,
      dob,
      phone,
      clinicaddress,
      degree,
      city,
      Experience,
      bio,
    } = req.body;
    const existingdoctor = await doctorrequest.findOne({ email });
    if (existingdoctor) {
      return res.status(200).send("Doctor Registery request Already exists");
    }
    const doctorreq = new doctorrequest({
      email,
      password,
      fullname,
      nic,
      gender,
      dob,
      phone,
      clinicaddress,
      degree,
      city,
      Experience,
      bio,
    });
    await doctorreq.save();
    res.status(200).send("Request Generated Successfully");
  } catch (err) {
    next(err);
  }
};

export const transportmail = async (req, res) => {
  const { email,type} = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  let newhtml;
  if(type=='Sign Up'){
    newhtml=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 30px;">
              <!-- ✅ LOGO -->
              <img src="https://res.cloudinary.com/dii4fqc0r/image/upload/v1752464173/Doctor-removebg-preview_fxyzoo.png" alt="Doctor Online Logo" width="120" style="display: block; margin-bottom: 20px;" />
              <!-- ✅ HEADING -->
              <h1 style="color: #2d3748;">Thanks for Signing Up!</h1>
              <p style="color: #4a5568; font-size: 16px;">Welcome to <strong>Doctor Online</strong>. We're glad to have you!</p>
              <!-- ✅ OTP -->
              <div style="margin: 30px 0;">
                <p style="color: #2d3748; font-size: 16px;">Your OTP for Sign Up is:</p>
                <div style="font-size: 28px; font-weight: bold; color: #3182ce; letter-spacing: 4px; background-color: #ebf8ff; padding: 10px 20px; border-radius: 6px; display: inline-block;">
                  ${otp}
                </div>
              </div>
              <p style="color: #718096; font-size: 14px;">Please use this OTP and do not share to anyone. If you didn't request this, just ignore this email.</p>
              <!-- ✅ Footer -->
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 12px; color: #a0aec0;">&copy; 2025 Doctor Online. All rights reserved.</p>
              <p style="font-size: 12px; color: #a0aec0;">Contact us at <a href="mailto:amanmuhammad567@gmail.com" style="color: #3182ce;">amanmuhammad567@gmail.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>  
</body>
</html>`
  }
  if(type=='password forget'){
    newhtml=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 30px;">
              <!-- ✅ Logo -->
              <img src="https://res.cloudinary.com/dii4fqc0r/image/upload/v1752464173/Doctor-removebg-preview_fxyzoo.png" alt="Doctor Online Logo" width="120" style="display: block; margin-bottom: 20px;" />
              
              <!-- ✅ Heading -->
              <h2 style="color: #2d3748;">Password Reset Request</h2>
              <p style="color: #4a5568; font-size: 16px;">We received a request to reset your password.</p>
              
              <!-- ✅ OTP Section -->
              <div style="margin: 30px 0;">
                <p style="color: #2d3748; font-size: 16px;">Use the following OTP to reset your password:</p>
                <div style="font-size: 28px; font-weight: bold; color: #e53e3e; letter-spacing: 4px; background-color: #fff5f5; padding: 10px 20px; border-radius: 6px; display: inline-block;">
                  ${otp}
                </div>
              </div>

              <!-- ✅ Reminder -->
              <p style="color: #718096; font-size: 14px;">This OTP is valid for a limited time. If you didn’t request a password reset, you can safely ignore this email.</p>

              <!-- ✅ Footer -->
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 12px; color: #a0aec0;">&copy; 2025 Doctor Online. All rights reserved.</p>
              <p style="font-size: 12px; color: #a0aec0;">
                Contact support: 
                <a href="mailto:amanmuhammad567@gmail.com" style="color: #3182ce;">amanmuhammad567@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>  
</body>
</html>`
  }
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email - Doctor Online",
    html: newhtml,
  };
  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Some Error Occurred.");
    }
    console.log(email + " " + otp);
    let log=new logs({
      mail:email,
      Otp:otp
    })
    await log.save();
    return res.status(200).send(`${otp}`);
  });
};
