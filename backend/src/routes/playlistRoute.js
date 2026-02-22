import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getAllPlaylistDetails,
    getPlaylistDetails,
    createPlaylist,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblmeFromPlaylist,
} from "../controllers/playlistController.js";

const router = Router();

router.get("/", authenticate, getAllPlaylistDetails);

router.get("/:playlistId", authenticate, getPlaylistDetails);

router.post("/create-playlist", authenticate, createPlaylist);

router.post("/:playlistId/add-problem", authenticate, addProblemToPlaylist);

router.delete("/:playlistId", authenticate, deletePlaylist);

router.delete(
    "/:playlistId/remove-problem",
    authenticate,
    removeProblmeFromPlaylist,
);

export default router;
