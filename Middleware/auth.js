
  const jwt = require("jsonwebtoken");

  async function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid token format" });
    }
  
    const token = tokenParts[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
  }
  
  function isSuperAdmin(req, res, next) {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access Forbidden: Only Super Admin can perform this action" });
    }
    next();
  }
  
  module.exports = { verifyToken, isSuperAdmin };
  
  