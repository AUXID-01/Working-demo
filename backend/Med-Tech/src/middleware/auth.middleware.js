import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const parts = authHeader.split(' ');
  const token = parts.length === 2 && parts[0].toLowerCase()==='bearer' ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Invalid authorization format. Use: Bearer <token>" });
  }


  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/*// optional role-based guard
export const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
  }
  next();
}; */


//gpt ne diya,  baad me dekhte h 
