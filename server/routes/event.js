import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
} from "../controllers/event.js";
import upload from "../config/multer.js";
const router = express.Router();
router
  .route("/event")
  .get(getEvent)
  .post(upload.array("files"), createEvent)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;
