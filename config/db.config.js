import mongoose from "mongoose";

export const connectDB = (URI) => {
  mongoose
    .connect(URI, { dbName: "RentalService" })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
