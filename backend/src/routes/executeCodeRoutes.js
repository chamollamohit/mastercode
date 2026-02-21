import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { executeCode } from "../controllers/executeCodeController.js";

const router = Router();

router.post("/", authenticate, executeCode);

export default router;
