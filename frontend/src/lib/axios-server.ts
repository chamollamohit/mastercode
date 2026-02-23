import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v1" : "/api/v1",
    headers: { "Content-Type": "application/json" }
});

serverApi.interceptors.request.use(async (config) => {
    if (typeof window === "undefined") {
        const cookieStore = await cookies();
        const token = cookieStore.get('JWT')?.value

        if (token) {
            config.headers["Cookie"] = [`JWT=${token}`]
        }
    }
    return config
})