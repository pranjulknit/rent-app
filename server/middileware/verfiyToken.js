import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
console.log("jwe",jwtSecret);
export const verifyToken = (req, res, next) => {
    console.log("verifyToken",req.cookies);
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) {
        console.log("error in verifyTOken",err)
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userData = userData; 
    next();
  });
};