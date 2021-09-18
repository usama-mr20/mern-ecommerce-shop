import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);

export default router;
