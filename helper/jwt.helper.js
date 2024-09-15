import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (id) => {
  const payload = {
    id,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
