import { Router } from "express";
import { searchContacts } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const contactRoutes = Router();

contactRoutes.route("/search").post(verifyJWT, searchContacts);

export default contactRoutes;