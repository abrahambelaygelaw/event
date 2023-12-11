import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("jwt", refreshToken);
    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "No Cookies" });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await User.findOne({
        username: decoded.user,
      });
      if (!foundUser) {
        console.log("User not found");
        return res.status(401).json({ decoded, message: "Unauthorized" });
      }
      const accessToken = generateAccessToken(foundUser);
      console.log("new token " + accessToken);
      res.json(accessToken);
    }
  );
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "User is not logged in" });
  }
  console.log("Logout request received");

  res.clearCookie("jwt", {});

  res.json({ message: "Cookie cleared" });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userInfo: {
        email: user.email,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2minutes",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};
