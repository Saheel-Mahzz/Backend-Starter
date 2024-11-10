import { body } from "express-validator";

export const validateUserRegistration = [
  body("username").notEmpty().withMessage("Username cannot be empty!"),
  body("email").isEmail().withMessage("Invalid email adderss!"),
  body("password")
    .length({ min: 6 })
    .withMessage("Password must be atleast 6 characters!"),
];
