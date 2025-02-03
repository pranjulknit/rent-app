import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import imageDownloader from 'image-downloader';  

const photoRouter = express();



// Upload by link route
photoRouter.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';

  try {
    await imageDownloader.image({
      url: link,
      dest: path.join(__dirname, 'uploads', newName)  
    });
    res.json(newName);
  } catch (err) {
    console.error("Error downloading image:", err);
    res.status(500).json({ message: "Failed to upload image by link" });
  }
});

// Multer middleware for file uploads
const photosMiddleware = multer({ dest: 'uploads' });

photoRouter.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path: tempPath, originalname } = req.files[i];
    const ext = path.extname(originalname);  // file extension
    const newPath = tempPath + ext;  // temp path
    fs.renameSync(tempPath, newPath);  // Rename the file  extension

    const newFileName = path.basename(newPath);  // new filename
    uploadedFiles.push(newFileName);  // Add the new filename to the list
  }

  res.json(uploadedFiles);  // Respond with the uploaded file names
});



export default photoRouter;