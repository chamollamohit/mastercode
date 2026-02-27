import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../src/routes/authRoutes.js";
import problemRoutes from "../src/routes/problemRoutes.js";
import executeCodeRoutes from "../src/routes/executeCodeRoutes.js";
import submissionRoutes from "../src/routes/submissionRoutes.js";
import playlistRoutes from "../src/routes/playlistRoute.js";
import userRoutes from "../src/routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", 1);
app.use(
    cors({
        origin: process.env.FRONT_END_URL,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy",
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute", executeCodeRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
