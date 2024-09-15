import { hashPassword, comparePassword } from "../../helper/bcrypt.helper.js";
import { generateToken } from "../../helper/jwt.helper.js";
import UserModel from "../../model/user.model.js";

//------- user signup -------
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ msg: "Failed to create user" });
    }

    const token = await generateToken(user._id);

    if (!token) {
      user.remove();
      return res
        .status(400)
        .json({ msg: "Failed to generate token please try again" });
    }

    const userDetail = user.toObject();
    delete userDetail.password;
    userDetail.token = token;

    return res
      .status(200)
      .json({ msg: "User created successfully", user: { ...userDetail } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

//------ user login -------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = await generateToken(user._id);

    if (!token) {
      return res
        .status(400)
        .json({ msg: "Failed to generate token please try again" });
    }

    const userDetail = user.toObject();
    delete userDetail.password;
    userDetail.token = token;

    return res
      .status(200)
      .json({ msg: "Login Successful", user: { ...userDetail } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export { signup, login };
