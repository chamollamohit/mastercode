import { Router } from "express";
import {
    authUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/authUser", authUser);

export default router;
