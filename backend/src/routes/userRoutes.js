import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getUserDetails } from "../controllers/userController.js";

const router = Router();

router.get("/get-user-details", authenticate, getUserDetails);

export default router;
