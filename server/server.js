import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/user.js";
import event from "./routes/event.js";
import registree from "./routes/registree.js";
import auth from "./routes/auth.js";
import corsOptions from "./config/cors.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(cors(corsOptions));
app.use(auth);
app.use(user);
app.use(event);
app.use(registree);
mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
