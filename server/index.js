import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRouter from "./routes/authRouts.js";
import bookingRouter from "./routes/bookingRoute.js";
import photoRouter from "./routes/photosRoute.js";
import placeRouter from "./routes/placeRoute.js";
import profileRouter from "./routes/profileRoute.js";



dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URL;
console.log(MONGO_URI)
mongoose.connect(MONGO_URI).then(()=>console.log("mongodb connected")).catch((e)=>
  console.log(e));



const app = express();
app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve('uploads')));  

app.use(
  cors({
    origin: 'http://localhost:5174', // Replace with the allowed origin
    credentials: true, // Allow credentials (cookies, HTTP auth, etc.)
  })
);
app.use(authRouter);
app.use(profileRouter);
app.use(photoRouter);
app.use(placeRouter);
app.use(bookingRouter);


app.listen(PORT,()=>{
  console.log(`server is running at ${PORT}`)
})


