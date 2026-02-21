import { Status } from "../generated/prisma/index.js";
import db from "../lib/db.js";
import {
    getLanguageName,
    pollBatchResults,
    submitBatch,
} from "../lib/judge0.js";

export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
        req.body;

    const userId = req.user.id;

    try {
        if (
            !Array.isArray(stdin) ||
            stdin.lenght === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length === 0 ||
            expected_outputs.length !== stdin.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing test case",
            });
        }

        const submissions = stdin.map((input, i) => ({
            source_code,
            language_id,
            stdin: input,
            expected_output: expected_outputs[i],
        }));

        const submissionsTokens = await submitBatch(submissions);
        const tokens = submissionsTokens.map((t) => t.token);

        const submissionsResults = await pollBatchResults(tokens);

        let allPassed = true;
        const detailedResults = submissionsResults.map((result, i) => {
            const stdout = result.stdout?.trim() || null;
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;

            // console.log(`Testcase #${i + 1}`);
            // console.log(`Input for testcase #${i + 1}: ${[i]}`);
            // console.log(
            //     `Expected output for testcase #${i + 1}: ${expected_output}`,
            // );
            // console.log(`Actual output for testcase #${i + 1}: ${stdout}`);
            // console.log(`Testcase #${i + 1} passed: ${passed}`);

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.stderr || null,
                compile_output: result.compile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined,
            };
        });

        const submission = await db.submission.create({
            data: {
                userId,
                problemId,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                stderr: detailedResults.some((r) => r.stderr)
                    ? JSON.stringify(detailedResults.map((r) => r.stderr))
                    : null,
                compilerOutput: detailedResults.some((r) => r.compile_output)
                    ? JSON.stringify(
                          detailedResults.map((r) => r.compile_output),
                      )
                    : null,
                status: allPassed ? Status.ACCEPTED : Status.REJECTED,
                memory: detailedResults.some((r) => r.memory)
                    ? JSON.stringify(detailedResults.map((r) => r.memory))
                    : null,
                time: detailedResults.some((r) => r.time)
                    ? JSON.stringify(detailedResults.map((r) => r.time))
                    : null,
            },
        });

        if (allPassed) {
            await db.problemSolved.upsert({
                where: {
                    userId_problemId: { userId, problemId },
                },
                update: {},
                create: { userId, problemId },
            });
        }

        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submission.id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compile_output,
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));

        await db.testCaseResult.createMany({ data: testCaseResults });

        const submissionWithTestCases = await db.submission.findUnique({
            where: { id: submission.id },
            include: { testCases: true },
        });

        return res.status(200).json({
            success: true,
            message: "Code executed successfully",
            data: submissionWithTestCases,
        });
    } catch (error) {
        console.error("Error executing code:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to execute code",
        });
    }
};
