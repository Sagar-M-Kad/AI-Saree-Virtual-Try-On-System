const Saree = require('../models/Saree');
const { validationResult } = require('express-validator');

/**
 * @desc    Get all sarees from catalog
 * @route   GET /api/sarees
 * @access  Public
 */
const getSarees = async (req, res, next) => {
  try {
    const sarees = await Saree.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: sarees.length, data: sarees });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed sample sarees for database
 * @route   POST /api/sarees/seed
 * @access  Private/Admin
 */
const seedSarees = async (req, res, next) => {
  try {
    const count = await Saree.countDocuments();
    if (count > 0) {
      return res.status(400).json({ success: false, message: 'Database already contains sarees.' });
    }

    const sampleSarees = [
      {
        name: 'Royal Blue Kanjivaram',
        category: 'Kanjivaram',
        color: 'Blue',
        fabric: 'Silk',
        description: 'Authentic pure silk Kanjivaram with gold zari woven border.',
        imageUrl: 'https://images.unsplash.com/photo-1583391733958-d25e07fac662?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Crimson Red Banarasi',
        category: 'Banarasi',
        color: 'Red',
        fabric: 'Silk',
        description: 'Classic Banarasi wedding saree with intricate floral motifs.',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ];

    await Saree.insertMany(sampleSarees);
    res.status(201).json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSarees,
  seedSarees
};
