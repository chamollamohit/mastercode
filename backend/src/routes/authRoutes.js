import { Router } from "express";
import {
    authUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/authUser", authenticate, authUser);

export default router;
