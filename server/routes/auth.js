import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
const router = express.Router();
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);
export default router;
