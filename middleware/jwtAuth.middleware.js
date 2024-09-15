import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

export const jwtAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.includes("Bearer")) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const tokenn = token.split(" ")[1];
    const decoded = jwt.verify(tokenn, process.env.JWT_SECRET);
    // => fetch user from database and store it into req.user
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
