

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.userData = userData; 
    next();
  });
};