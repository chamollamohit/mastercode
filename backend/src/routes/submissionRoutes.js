import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getAllSubmissions,
    getSubmissionsCountForProblem,
    getSubmissionsForProblem,
} from "../controllers/submissionController.js";

const router = Router();

router.get("/get-all-submissions", authenticate, getAllSubmissions);

router.get(
    "/get-submissions/:problemId",
    authenticate,
    getSubmissionsForProblem,
);

router.get(
    "/get-submissions-count/:problemId",
    authenticate,
    getSubmissionsCountForProblem,
);

export default router;
