import jwt from "jsonwebtoken";
import db from "../lib/db.js";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.JWT;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token provided",
            });
        }

        const user = await db.user.findUnique({
            where: { id: decodedToken.id },
            select: { id: true, name: true, role: true, email: true },
        });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not authenticated" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in Auth middleware", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const checkAdmin = async (req, res, next) => {
    try {
        const { id, name, role, email } = req.user;

        if (role !== "ADMIN") {
            return res
                .status(403)
                .json({ success: false, message: "User is not admin" });
        }
        next();
    } catch (error) {
        console.error("Error in Admin middleware", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
