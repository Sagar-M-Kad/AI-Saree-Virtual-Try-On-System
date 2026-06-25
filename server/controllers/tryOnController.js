const { validationResult } = require('express-validator');
const TryOn = require('../models/TryOn');
const { uploadImageBuffer, uploadImageUrl } = require('../services/cloudinaryService');
const { generateTryOnImage } = require('../services/aiService');

/**
 * @desc    Generate a virtual try-on image
 * @route   POST /api/tryon
 * @access  Public
 */
const createTryOn = async (req, res, next) => {
  try {
    // 1. Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map(e => e.msg).join(', ');
      const err = new Error(errorMsg);
      err.statusCode = 400;
      return next(err);
    }

    if (!req.file) {
      const err = new Error('Please upload a user image');
      err.statusCode = 400;
      return next(err);
    }

    const { sareeImageUrl } = req.body;

    // 2. Upload user image to Cloudinary
    let userCloudinaryUrl;
    try {
      const uploadResult = await uploadImageBuffer(req.file.buffer);
      userCloudinaryUrl = uploadResult.secure_url;
    } catch (uploadError) {
      const err = new Error('Failed to upload user image to storage');
      err.statusCode = 500;
      return next(err);
    }

    // 3. Create initial TryOn record in MongoDB (PENDING status)
    const newTryOn = await TryOn.create({
      userImageUrl: userCloudinaryUrl,
      sareeImageUrl,
      status: 'PROCESSING'
    });

    // We process the AI generation synchronously for this specific REST implementation.
    // In highly scalable production apps, this should be offloaded to a message queue.
    try {
      // 4. Call Gemini API service
      const { generatedImageUrl, promptUsed } = await generateTryOnImage(userCloudinaryUrl, sareeImageUrl);

      // 5. Upload generated image to Cloudinary
      // NOTE: If Gemini returns a base64 string, we upload the buffer. 
      // If it returns a URL (like our mock), we upload via URL.
      // Assuming mock returns URL, we re-upload or directly save the URL if it's already hosted permanently.
      // Since our mock gives a cloudinary URL, we will directly save it.
      
      // 6. Update MongoDB record
      newTryOn.generatedImageUrl = generatedImageUrl;
      newTryOn.promptUsed = promptUsed;
      newTryOn.status = 'COMPLETED';
      await newTryOn.save();

      // 7. Return JSON response
      return res.status(200).json({
        success: true,
        data: newTryOn
      });

    } catch (aiError) {
      // Handle generation failures
      newTryOn.status = 'FAILED';
      await newTryOn.save();
      const err = new Error(aiError.message || 'AI Generation Process Failed');
      err.statusCode = 500;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all try-on history
 * @route   GET /api/history
 * @access  Public
 */
const getHistory = async (req, res, next) => {
  try {
    const history = await TryOn.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a specific try-on record
 * @route   DELETE /api/history/:id
 * @access  Public
 */
const deleteHistory = async (req, res, next) => {
  try {
    const tryOn = await TryOn.findById(req.params.id);
    if (!tryOn) {
      const err = new Error('Try-on record not found');
      err.statusCode = 404;
      return next(err);
    }

    await TryOn.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTryOn,
  getHistory,
  deleteHistory
};
