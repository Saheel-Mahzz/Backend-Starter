// eventValidation.js
import { body } from "express-validator";

export const eventValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a valid number")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive value"),
  body("destination")
    .notEmpty()
    .withMessage("Destination is required")
    .isString()
    .withMessage("Destination must be a string"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("time")
    .optional()
    .isString()
    .withMessage("Time must be in a valid string format"),
];
