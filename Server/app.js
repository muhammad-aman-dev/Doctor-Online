import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import router from "./routes/auth.js";
import modifyRouter from "./routes/modifyaccounts.js";
import { globalerrorHandler } from "./middlewares/errorhandler.js";
import cookieParser from "cookie-parser";
import cloudinary from "./config/cloudinaryconfig.js";
import messagerouter from "./routes/messagerouter.js";

dotenv.config();
const app = express();

connectDB(); 

 
app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));
app.use(cookieParser())
app.use("/api/auth", router);
app.use("/modify",modifyRouter);
app.use("/message",messagerouter)

app.get("/", (req, res) => { 
  res.send("hello world");
});

app.use(globalerrorHandler);
export default app;
