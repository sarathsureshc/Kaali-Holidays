const validatePackageInput = (req, res, next) => {
  const { title, destination, price, duration } = req.body;
  
  if (!title || !destination || !price || !duration) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields'
    });
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Price must be a positive number'
    });
  }
  
  next();
};

module.exports = { validatePackageInput };