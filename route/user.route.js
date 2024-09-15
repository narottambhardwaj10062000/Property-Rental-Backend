import express from "express";
const Router = express.Router();
import { signup, login } from "../controller/user/user.controller.js";

Router.route("/signup").post(signup);
Router.route("/login").post(login);

export default Router;
