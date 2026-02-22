import db from "../lib/db.js";

export const getAllPlaylistDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const playlists = await db.playlist.findMany({
            where: { userId },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            data: playlists,
        });
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch playlist",
        });
    }
};

export const getPlaylistDetails = async (req, res) => {
    const { playlistId } = req.params;
    const userId = req.user.id;

    try {
        const playlist = await db.playlist.findUnique({
            where: { id: playlistId, userId },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });
        if (!playlist) {
            return res
                .status(404)
                .json({ success: false, message: "Playlist not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            data: playlist,
        });
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch playlist",
        });
    }
};

export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res
                .status(400)
                .json({ success: false, messae: "All fields are required" });
        }
        const userId = req.user.id;

        const playList = await db.playlist.create({
            data: {
                name,
                description,
                userId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Playlist created successfully",
            data: playList,
        });
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create playlist",
        });
    }
};

export const addProblemToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!problemIds || !Array.isArray(problemIds) || problemIds.length === 0) {
        return res
            .status(400)
            .json({ status: false, message: "Invalid or missing problemId" });
    }

    try {
        const problemsInPlaylist = await db.problemInPlaylist.createMany({
            data: problemIds.map((problemId) => ({ playlistId, problemId })),
        });

        return res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
            data: problemsInPlaylist,
        });
    } catch (error) {
        console.error("Error adding problems to playlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add problems to playlist",
        });
    }
};

export const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId,
            },
        });
        if (deletedPlaylist.count === 0) {
            return res.status(404).json({
                success: false,
                message: "No playlist found to delete",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            data: deletedPlaylist,
        });
    } catch (error) {
        console.error("Error deleting playlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete playlist",
        });
    }
};

export const removeProblmeFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!problemIds || !Array.isArray(problemIds) || problemIds.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid or missing problemIds" });
    }

    try {
        const deletedProblem = await db.problemInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemIds,
                },
            },
        });

        if (deletedProblem.count === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching problems found in the specified playlist",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Problem removed from playlist successfully",
            data: deletedProblem,
        });
    } catch (error) {
        console.error("Error removing problem from playlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to remove problem from playlist",
        });
    }
};
