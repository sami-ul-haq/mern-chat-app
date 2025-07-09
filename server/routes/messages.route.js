import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessages } from "../controllers/messages.controller.js";

const messagesRoutes = Router();

messagesRoutes.route("/get-messages").post(verifyJWT, getMessages);

export default messagesRoutes;
