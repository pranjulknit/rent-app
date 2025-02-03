import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import multer  from "multer";
import exp from "constants";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;


const app = express();

app.listen(PORT,()=>{
  console.log(`server is running at ${PORT}`)
})


