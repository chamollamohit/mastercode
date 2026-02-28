import { Router } from "express";
import { authenticate, checkAdmin } from "../middlewares/authMiddleware.js";
import {
    createProblem,
    deleteProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
} from "../controllers/problemController.js";

const router = Router();

router.post("/create", authenticate, checkAdmin, createProblem);

router.get("/get-all-problem", authenticate, getAllProblems);

router.get("/get-problem/:id", authenticate, getProblemById);

router.post("/update-problem/:id", authenticate, checkAdmin, updateProblem);

router.delete("/delete-problem/:id", authenticate, checkAdmin, deleteProblem);

export default router;
