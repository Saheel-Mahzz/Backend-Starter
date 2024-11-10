import { validationResult } from "express-validator";
import Event from "../Models/eventModal.js";

export const createEvent = async (req, res) => {
  const { title, description, price, destination, time, date } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      price,
      destination,
      time,
      date,
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, destination, time, date } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    // Find event by ID and update it
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, price, destination, time, date },
      { new: true } // Option to return the updated document
    );

    // If no event found, return 404 error
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Send back the updated event
    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    // Pass errors to the error handler
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find and delete the event by ID
    const deletedEvent = await Event.findByIdAndDelete(id);

    // If no event found, return a 404 error
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (err) {
    // Pass any errors to the error handler
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find(); // Get all events from the database

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err); // Forward any errors to the error handler
  }
};

export const getEventById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the event by its ID
    const event = await Event.findById(id);

    // If event is not found, return 404
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};
