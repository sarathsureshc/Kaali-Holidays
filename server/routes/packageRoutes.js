const express = require('express');
const router = express.Router();
const {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
const { auth } = require('../middleware/authMiddleware');


// Public Routes
router.get('/', getAllPackages);
router.get('/:id', getPackageById);

// Admin Routes (protect with auth later)
router.post('/', auth, createPackage);
router.put('/:id', auth, updatePackage);
router.delete('/:id', auth, deletePackage);

module.exports = router;