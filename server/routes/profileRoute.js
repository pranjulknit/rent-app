import { profileEnd } from "console";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const profileRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

profileRouter.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" }); 
      }
    
      try {
        // Vverifying the token
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" }); 
          }
    
          // Fetching the  user details
          const user = await User.findById(userData.id);
          if (!user) {
            // if there is no user
            return res.status(404).json({ message: "User not found" }); 
          }
    
          // Returning user data
          console.log("profile",user)
          const { name, email, _id } = user;
          res.status(200).json({ name, email, _id });
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "rror fetching profile" }); 
      }
  });
  
  
  export default profileRouter;