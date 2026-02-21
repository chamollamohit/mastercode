import db from "../lib/db.js";

export const getAllSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;

        const submissions = db.submission.findMany({
            where: { userId },
        });

        return res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions,
        });
    } catch (error) {
        console.error("Error in fetching submissions", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getSubmissionsForProblem = async (req, res) => {
    try {
        const userId = req.user.id;
        const problemId = req.params;

        const submissions = db.submission.findMany({
            where: { userId, problemId },
        });

        return res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions,
        });
    } catch (error) {
        console.error("Error in fetching submissions", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getSubmissionsCountForProblem = async (req, res) => {
    try {
        const problemId = req.params;

        const submissions = db.submission.count({
            where: { problemId },
        });

        return res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions,
        });
    } catch (error) {
        console.error("Error in fetching submissions", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
