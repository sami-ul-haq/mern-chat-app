import { Router } from "express";
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();

const upload = multer({
  dest: "uploads/profiles/",
});

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/user").get(verifyJWT, getUserInfo);
router.route("/update-profile").post(verifyJWT, updateProfile);
router
  .route("/add-profile-image")
  .post(verifyJWT, upload.single("profile-image"), addProfileImage);

router.route("/remove-profile-image").delete(verifyJWT, removeProfileImage);

export default router;
