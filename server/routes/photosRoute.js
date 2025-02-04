import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import imageDownloader from 'image-downloader';

const photoRouter = express();

// Helper to resolve __dirname in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Normalize the directory path
const normalizedDirname = __dirname.startsWith('/') ? __dirname.slice(1) : __dirname;

// Ensure uploads directory exists
const uploadsDir = path.join(normalizedDirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

photoRouter.use('/uploads', express.static(uploadsDir));

// Upload by link route
photoRouter.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';

  try {
    await imageDownloader.image({
      url: link,
      dest: path.join(uploadsDir, newName)  // Save the image in the 'uploads' folder
    });
    res.json(newName);
  } catch (err) {
    console.error("Error downloading image:", err);
    res.status(500).json({ message: "Failed to upload image by link" });
  }
});

// Multer middleware for file uploads
const photosMiddleware = multer({ dest: uploadsDir });

photoRouter.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path: tempPath, originalname } = req.files[i];
    const ext = path.extname(originalname);  // Get the file extension
    const newPath = tempPath + ext;  // Add the extension to the temp file path
    fs.renameSync(tempPath, newPath);  // Rename the file with the correct extension

    const newFileName = path.basename(newPath);  // Get the new filename
    uploadedFiles.push(newFileName);  // Add the new filename to the list
  }

  res.json(uploadedFiles);  // Respond with the uploaded file names
});

export default photoRouter;
