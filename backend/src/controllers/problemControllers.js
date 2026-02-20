import db from "../lib/db";

export const createProblem = async (req, res) => {};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if (condition.length === 0) {
            return res
                .status(200)
                .json({ success: false, message: "No problems to show" });
        }

        return res.status(200).json({ success: true, data: problems });
    } catch (error) {
        console.error("Error in getting all problems", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const { id } = req.param;

        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        });

        if (!problem) {
            return res
                .status(404)
                .json({ success: false, message: "Problem not exist" });
        }

        return res.status(200).json({
            success: true,
            data: problem,
        });
    } catch (error) {
        console.error("Error in getting problem", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const updateProblem = async (req, res) => {
    const problemData = req.body;
    try {
        const { id } = req.param;

        const updatedProblem = await db.problem.update({
            where: {
                id,
            },
            data: { problemData },
        });

        if (!updatedProblem) {
            return res
                .status(404)
                .json({ success: false, message: "Unable to update Problem" });
        }

        return res.status(200).json({
            success: true,
            data: updatedProblem,
        });
    } catch (error) {
        console.error("Error in updating problem", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.param;

        const deletedProblem = await db.problem.delete({
            where: {
                id,
            },
        });

        if (!deletedProblem) {
            return res
                .status(404)
                .json({ success: false, message: "Unable to delete Problem" });
        }

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        console.error("Error in updating problem", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
