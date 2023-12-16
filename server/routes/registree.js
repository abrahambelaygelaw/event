import express from "express";
import {
  createRegistree,
  getRegistree,
  updateRegistree,
  deleteRegistree,
} from "../controllers/registree.js";

const router = express.Router();
router
  .route("/registree")
  .get(getRegistree)
  .put(updateRegistree)
  .post(createRegistree)
  .delete(deleteRegistree);

export default router;
