import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "rented"],
    default: "available",
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  image: {
    public_id: { type: String, required: true },
    link: { type: String, required: true },
  },
});
const Property = mongoose.model("Property", propertySchema);

export default Property;
