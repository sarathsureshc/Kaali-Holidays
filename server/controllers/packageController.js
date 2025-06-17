const Package = require('../models/Package');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const packages = await Package.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Package.countDocuments();
    
    res.json({
      packages,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching packages',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get single package
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new package
exports.createPackage = async (req, res) => {
  try {
    const newPkg = new Package(req.body);
    await newPkg.save();
    res.status(201).json(newPkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};