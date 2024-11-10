import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../Controllers/eventsController.js";
import { eventValidation } from "../Validators/eventValidation.js";
import { validateId } from "../Validators/validateId.js";

const router = express.Router();

router.get("/all", getEvents);
router.post("/create", eventValidation, createEvent);
router.put("/:id", validateId, eventValidation, updateEvent);
router.delete("/:id", validateId, deleteEvent);
router.get("/:id", validateId, getEventById);

export default router;
