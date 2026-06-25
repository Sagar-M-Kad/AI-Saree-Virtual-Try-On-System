const multer = require('multer');

/**
 * Configure multer to use memory storage
 * This allows us to handle the buffer directly and upload to Cloudinary
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    return cb(new Error('Please upload an image file (jpg, jpeg, png, webp)'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
