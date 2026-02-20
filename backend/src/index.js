import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
