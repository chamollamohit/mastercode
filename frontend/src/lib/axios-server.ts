import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
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