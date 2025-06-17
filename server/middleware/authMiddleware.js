const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token, access denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = { auth }; // ✅ Named export
  