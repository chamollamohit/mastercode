import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "../src/routes/authRoutes.js";
import problemRoutes from "../src/routes/problemRoutes.js";
import executeCodeRoutes from "../src/routes/executeCodeRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
