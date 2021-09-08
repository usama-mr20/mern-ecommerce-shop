import express from "express";
import { authUser } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
export default router;
