import { User } from "../models/auth.model.js";

const options = {
  httpOnly: true,
  secure: true,
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    if (!email || !password) {
      return res.status(404).json({ message: "Email & Password Is Required." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with email already exists" });
    }

    const user = await User.create({
      email,
      password,
    });

    if (!user) {
      return res
        .status(500)
        .send("Something went wrong while registering the user");
    }

    const accessToken = await user.generateAccessToken();

    return res.status(201).cookie("accessToken", accessToken, options).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something Went Wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with email not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Password is incorrect." });
    }

    const accessToken = await user.generateAccessToken();

    return res.status(200).cookie("accessToken", accessToken, options).json({
      message: "User Logged In SuccessFull",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Something Went Wrong" });
  }
};

const getUserInfo = async (req, res) => {
  res
    .status(200)
    .json({ message: "User fetched successfully", user: req.user });
};

export { signup, login, getUserInfo };
