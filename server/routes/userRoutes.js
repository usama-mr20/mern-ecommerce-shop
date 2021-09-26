import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);
router.put("/profile", protect, updateUserProfile);

export default router;
