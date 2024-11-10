import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  destination: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
