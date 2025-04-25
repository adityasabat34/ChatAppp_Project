import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";

const router = Router();

router.get("/users", protect, getAllUsers);
router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, sendMessages);

export default router;
