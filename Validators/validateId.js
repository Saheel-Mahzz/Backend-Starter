import { param } from "express-validator";

export const validateId = [
  param("id").isMongoId().withMessage("Invalid event ID format"),
];
