import express from "express";
import {
  createRegistree,
  getRegistree,
  updateRegistree,
  deleteRegistree,
} from "../controllers/registree.js";

const router = express.Router();
router
  .route("/events")
  .get(getRegistree)
  .put(updateRegistree)
  .post(createRegistree)
  .delete(deleteRegistree);

export default router;
