import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_DP_URL = process.env.Default_DP;

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!!!"]
  },
  password: {
    type: String,
    required: [true, "Password is required!!!"]
  },
  fullname: {
    type: String,
    required: [true, "Full Name is required!!!"]
  },
  nic: {
    type: String,
    required: [true, "NIC is required!!!"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required!!!"]
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required!!!"]
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required!!!"]
  },
  clinicaddress: {
    type: String,
    required: [true, "Clinic Address is required!!!"]
  },
  degree: {
    type: String,
    required: [true, "Degree is required!!!"]
  },
  city: {
    type: String,
    required: [true, "City is required!!!"]
  },
  Experience: {
    type: Number,
    required: [true, "Experience is required!!!"]
  },
  bio: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  role: {
    type: String,
    required: [true, "Role is required!!!"]
  },
  dpURL: {
    type: String,
    default: DEFAULT_DP_URL
  }
});

// Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password
doctorSchema.methods.comparePassword = async function (enteredpass) {
  return await bcrypt.compare(enteredpass, this.password);
};

// Generate JWT
doctorSchema.methods.generateToken = function () {
  return jwt.sign(
    { email: this.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE || '1d'
    }
  );
};

export default mongoose.model("Doctors", doctorSchema);