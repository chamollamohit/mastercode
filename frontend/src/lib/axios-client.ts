import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v1" : "/api/v1",
    withCredentials: true,
});

