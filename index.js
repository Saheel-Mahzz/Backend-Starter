import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./Middlewares/ErrorHandler.js";
import authRoute from "./Routes/authRoute.js";
import eventRoute from "./Routes/eventRoute.js";
const app = express();
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;
let server;

app.use(errorHandler);

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use("/events", eventRoute);

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_STRING);
    console.log("connected to mongodb!");
  } catch (err) {
    console.log("Error connecting to the Mongodb database!", err);
  }
};

const startServer = () => {
  connectToMongoDb();

  server = app.listen(port, () => {
    console.log("Server running on port: ", port);
  });
};

const gracefullyShutDown = async () => {
  console.log("gracefully shutting down!");
  server.close((err) => {
    if (err) {
      console.log("Error occured while shutting down!");
    }
    console.log("Server is closed!");
    process.exit(0);
  });
};
process.on("SIGINT", gracefullyShutDown);

startServer();
