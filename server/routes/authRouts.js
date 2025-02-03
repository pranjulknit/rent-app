import express from "express";
import User from "../models/user.js"
const authRouter = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "your-jwt-secret"; 
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,3);
    try {
      const userDoc = await User.create({
        name,
        email,
        password: hashedPassword
      });
      res.status(201).json({
        message:"user registered successfully"
      });
    } catch (e) {
        console.log("error in register",e);
      res.status(401).json({
        message: "Signup Failed"
      });
    }
  });
  
  authRouter.post('/login', async (req,res) => {
    // mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const compare = await bcrypt.compare(password, userDoc.password);
      if (compare) {
        const token = jwt.sign(
            {
              email: userDoc.email,
              id: userDoc._id,
            },
            jwtSecret,
        
          );
    
          // Send token in cookie and user details
          res.cookie('token', token, { httpOnly: true }).json({
            message: 'Login successful',
            user: {
              id: userDoc._id,
              name: userDoc.name,
              email: userDoc.email,
            },
            token, 
          });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.status(401).json('not found');
    }
  });
  

  authRouter.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
  })
  

  export default authRouter;