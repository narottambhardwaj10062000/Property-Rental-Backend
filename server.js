import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import userRoute from "./route/user.route.js";
import propertyRoute from "./route/property.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is Running" });
});

//Routes
app.use("/api", userRoute);
app.use("/api", propertyRoute);

// non existing route
app.get("*", (req, res) => {
  res.status(400).json({ msg: "404 Not Found" });
});

const start = () => {
  connectDB(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
