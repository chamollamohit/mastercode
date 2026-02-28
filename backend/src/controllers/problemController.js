import db from "../lib/db.js";
import {
    getJudge0LanguageId,
    pollBatchResults,
    submitBatch,
} from "../lib/judge0.js";
import redis from "../lib/redis.js";

export const createProblem = async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
        hints,
        editorial,
    } = req.body;

    if (
        !title ||
        !description ||
        !difficulty ||
        !tags ||
        !examples ||
        !constraints ||
        !testCases ||
        !codeSnippets ||
        !referenceSolutions ||
        !hints ||
        !editorial
    ) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    try {
        for (const [language, solutionCode] of Object.entries(
            referenceSolutions,
        )) {
            const languageId = getJudge0LanguageId(language);

            if (!languageId) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid Language: ${language}`,
                });
            }

            const submissions = testCases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submissionsTokens = await submitBatch(submissions);

            const tokens = submissionsTokens.map((t) => t.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        success: false,
                        message: `Validation failed for ${language} on input: ${submissions[i].stdin}`,
                        data: result,
                    });
                }
            }
        }

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testCases,
                codeSnippets,
                referenceSolutions,
                hints,
                editorial,
                userId: req.user.id,
            },
        });

        await redis.del("problems:all");

        return res.status(200).json({
            success: true,
            message: "Problem created successfully",
            data: newProblem,
        });
    } catch (error) {
        console.error("Error in creating problem", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getAllProblems = async (req, res) => {
    try {
        const cachedProblems = await redis.get("problems:all");

        if (cachedProblems) {
            const parsedProblems = JSON.parse(cachedProblems);
            return res.status(200).json({
                success: true,
                data: parsedProblems,
                message: "All problems fetched",
            });
        }

        const problems = await db.problem.findMany({
            include: {
                solvedBy: true,
            },
        });

        if (problems.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No problems to show",
            });
        }
        const problemsString = JSON.stringify(problems);
        await redis.set("problems:all", problemsString, "EX", 3600);

        return res.status(200).json({
            success: true,
            data: problems,
            message: "All problems fetched",
        });
    } catch (error) {
        console.error("Error in getting all problems", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;

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
            message: "Problem fetched",
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
        const { id } = req.params;

        const updatedProblem = await db.problem.update({
            where: {
                id,
            },
            data: { ...problemData },
        });

        if (!updatedProblem) {
            return res
                .status(404)
                .json({ success: false, message: "Unable to update Problem" });
        }

        await redis.del("problems:all");

        return res.status(200).json({
            success: true,
            data: updatedProblem,
            message: "Problem updated",
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
        const { id } = req.params;

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

        await redis.del("problems:all");

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
