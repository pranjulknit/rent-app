import express from "express";
import Booking from "../models/booking.js"; 
import getUserDataFromReq from "../utils/getUser.js";

const bookingRouter = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     description: Creates a new booking for the logged-in user.
 *     operationId: createBooking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               numberOfGuests:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *             required:
 *               - place
 *               - checkIn
 *               - checkOut
 *               - numberOfGuests
 *               - name
 *               - phone
 *               - price
 *     responses:
 *       201:
 *         description: Successfully created the booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 place:
 *                   type: string
 *                 checkIn:
 *                   type: string
 *                   format: date
 *                 checkOut:
 *                   type: string
 *                   format: date
 *                 numberOfGuests:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 user:
 *                   type: string
 *       500:
 *         description: Error creating booking
 */
bookingRouter.post('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
    } = req.body;

    // Create a new booking
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id, 
    });

    res.status(201).json(booking); 
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Error creating booking" }); 
  }
});

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     description: Retrieves all bookings associated with the logged-in user.
 *     operationId: getUserBookings
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   place:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                     format: date
 *                   checkOut:
 *                     type: string
 *                     format: date
 *                   numberOfGuests:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *                   user:
 *                     type: string
 *       500:
 *         description: Error fetching bookings
 */
bookingRouter.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    const bookings = await Booking.find({ user: userData.id }).populate('place');

    res.status(200).json(bookings); // Return the list of bookings
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" }); 
  }
});

export default bookingRouter;
