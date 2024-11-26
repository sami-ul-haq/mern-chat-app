import { User } from "../models/auth.model.js";
import fs, { unlinkSync } from "fs";

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

const updateProfile = async (req, res) => {
  try {
    const { _id } = req.user;

    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const userData = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ message: "user updated sucessfully", user: userData });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong while updating the fields" });
  }
};

const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is Required" });
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    fs.renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: fileName,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Image Updated Successfull",
      image: updatedUser.profileImage,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Went wrong while udating the image" });
  }
};

const removeProfileImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).json({ message: "User Not Found." });
    }

    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile Image Deleted Successfull" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Went wrong while deleting the image" });
  }
};

export {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
};
