/* import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  

  let token_split = token.split(" ");
  console.log(token_split)

  jwt.verify(token_split[1], process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
} */
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
  
  