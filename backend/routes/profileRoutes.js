import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware.js";
import { profile } from "../controller/userController.js";

router.get("/", authMiddleware, profile);

export default router;
