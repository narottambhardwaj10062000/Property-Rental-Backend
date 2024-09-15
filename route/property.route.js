import express from "express";
const Router = express.Router();
import { jwtAuth } from "../middleware/jwtAuth.middleware.js";
import {
  listProperties,
  addProperty,
  updateProperty,
  updatePropertyImage,
  deleteProperty,
} from "../controller/property/index.js";
import upload from "../middleware/multer.middleware.js";

Router.route("/list-properties").get(listProperties);
Router.route("/property").post(jwtAuth, upload.single("image"), addProperty);
Router.route("/property/:id")
  .put(jwtAuth, updateProperty)
  .delete(jwtAuth, deleteProperty);
Router.route("/property/:id/image").put(
  jwtAuth,
  upload.single("image"),
  updatePropertyImage
);

export default Router;
