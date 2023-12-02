import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/user.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(user);
mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port 4000 ");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
