import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 6,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
