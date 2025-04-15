import express from "express";
import checker from "../controller/db.js";
const router = express.Router();

router.get("/", checker);

export default router;
