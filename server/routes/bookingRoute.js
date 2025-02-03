import express from "express";
import Booking from "../models/booking.js"; 
import getUserDataFromReq from "../utils/getUser.js";

const bookingRouter = express.Router();

// Create a booking
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

// Getting all the booking for logged in users.
bookingRouter.get('/bookings', async (req, res) => {
  try {
   
    const userData = await getUserDataFromReq(req);

    
    const bookings = await Booking.find({ user: userData.id }).populate('place');

    res.status(201).json(bookings); // Return the list of bookings
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" }); 
  }
});

export default bookingRouter;
