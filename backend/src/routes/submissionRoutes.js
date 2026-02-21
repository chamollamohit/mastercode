import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";

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
