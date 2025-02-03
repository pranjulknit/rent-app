import express from "express";
import User from "../models/user.js";
const authRouter = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "your-jwt-secret"; 

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by providing name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       401:
 *         description: Signup failed
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);
  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).json({
      message: "user registered successfully"
    });
  } catch (e) {
    console.log("error in register", e);
    res.status(401).json({
      message: "Signup Failed"
    });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates the user by email and password, and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       422:
 *         description: Invalid password
 *       401:
 *         description: User not found
 */
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
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
      res.status(422).json('Password not correct');
    }
  } else {
    res.status(401).json('User not found');
  }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout the current user
 *     description: Logs out the current user by clearing the JWT token from the cookies.
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
authRouter.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

export default authRouter;
