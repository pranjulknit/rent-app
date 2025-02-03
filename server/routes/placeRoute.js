import express from "express";

import Place from "../models/place.js"; 
import { verifyToken } from "../middileware/verfiyToken.js";


const placeRouter = express.Router();



// Route to create a new place
placeRouter.post('/places', verifyToken, async (req, res) => {
  const { title, address, addedPhotos, description, price, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
  const { id } = req.userData; // User ID 
  
  try {
    const placeDoc = await Place.create({
      owner: id, 
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.status(201).json(placeDoc); 
  } catch (error) {
    console.error("Error creating place:", error);
    res.status(500).json({ message: "Failed to create place" });
  }
});

// specific place id
placeRouter.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ message: "Server error" });
  }
});


placeRouter.get('/user-places', verifyToken, async (req, res) => {
  const { id } = req.userData; // User ID from the token
  try {
    const places = await Place.find({ owner: id });
    res.json(places);
  } catch (error) {
    console.error("Error fetching user's places:", error);
    res.status(500).json({ message: "Failed to fetch places" });
  }
});

// Route to update a place
placeRouter.put('/places', verifyToken, async (req, res) => {
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  const { id: userId } = req.userData; // User ID from the token
  
  try {
    const placeDoc = await Place.findById(id);
    if (!placeDoc) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (userId === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
      });
      await placeDoc.save();
      res.json({ message: "Place updated successfully" });
    } else {
      res.status(403).json({ message: "Forbidden: You are not the owner of this place" });
    }
  } catch (error) {
    console.error("Error updating place:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all places
placeRouter.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Failed to fetch places" });
  }
});

export default placeRouter;
