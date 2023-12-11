import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
const router = express.Router();

router
  .route("/user")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);
export default router;
