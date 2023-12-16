import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEvent,
} from "../controllers/event.js";
import upload from "../config/multer.js";
const router = express.Router();
router.route("/event").get(getEvents).post(upload.array("files"), createEvent);

router.route("/event/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

export default router;
