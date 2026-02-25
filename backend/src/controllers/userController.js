import db from "../lib/db.js";

export const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                submissions: true,
                playlists: true,
                solvedProblems: {
                    include: {
                        problem: true,
                    },
                },
            },
            omit: {
                password: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found!!",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: "User details fetched successfully",
        });
    } catch (error) {
        console.error("User Detail Fetching error", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
