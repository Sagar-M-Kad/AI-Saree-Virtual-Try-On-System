const cloudinary = require('../config/cloudinary');

/**
 * Uploads an image buffer to Cloudinary
 * @param {Buffer} buffer - The image buffer
 * @param {String} folderName - The Cloudinary folder to store the image
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImageBuffer = (buffer, folderName = 'saree_try_on') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(new Error('Failed to upload image to Cloudinary'));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Uploads an image from a URL to Cloudinary
 * @param {String} imageUrl - The remote URL to upload
 * @param {String} folderName - The Cloudinary folder
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImageUrl = async (imageUrl, folderName = 'saree_try_on') => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folderName,
      resource_type: 'image',
    });
    return result;
  } catch (error) {
    console.error('Cloudinary URL upload error:', error);
    throw new Error('Failed to upload remote image to Cloudinary');
  }
};

module.exports = {
  uploadImageBuffer,
  uploadImageUrl,
};
