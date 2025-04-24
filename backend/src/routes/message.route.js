import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/message.controller.js";

const router = Router();

router.get("/users", protect, getAllUsers);

export default router;
