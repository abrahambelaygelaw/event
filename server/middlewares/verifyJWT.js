import jwt from "jsonwebtoken";
import User from "../models/User.js ";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const tokenParts = authHeader.split(" ");
  if (
    tokenParts.length !== 2 ||
    tokenParts[0].toLowerCase() !== "bearer" ||
    tokenParts[1] === "null"
  ) {
    return res.status(401).json({ error: "Invalid format or no token" });
  }

  const token = tokenParts[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Expired token" });
    }
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};
