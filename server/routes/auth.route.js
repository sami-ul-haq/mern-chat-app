import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/user").get(verifyJWT, getUserInfo);

export default router;
