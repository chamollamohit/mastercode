import db from "../lib/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/index.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }
    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET);

        res.cookie("JWT", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            data: { id: user.id, name: user.name, role: user.role },
            message: "User loged in successfully",
        });
    } catch (error) {
        console.error("Login error", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const registerUser = async (req, res) => {
    const { email, name, password } = await req.body;

    if (!email || !name || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }

    try {
        const userExist = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "User already exist" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: UserRole.USER,
            },
        });
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET);

        res.cookie("JWT", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
        });
        return res.status(201).json({
            success: true,
            data: { id: user.id, name: user.name, role: user.role },
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Registration error", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie("JWT");

    return res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
};

export const authUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in authUser", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
