"use server"

import { serverApi } from "@/lib/axios-server"
import axios from "axios";
import { cookies } from "next/headers";
import setCookie from 'set-cookie-parser'

export const login = async (data: { email: string, password: string }) => {

    try {
        const response = await serverApi.post('/auth/login', data)

        const setCookieHeader = response.headers['set-cookie'];

        if (setCookieHeader && setCookieHeader.length > 0) {
            const parsedCookies = setCookie(setCookieHeader)

            const cookieStore = await cookies();

            parsedCookies.forEach((cookie) => {

                cookieStore.set(cookie.name, cookie.value, {
                    httpOnly: cookie.httpOnly,
                    secure: cookie.secure,
                    sameSite: cookie.sameSite as "lax" | "strict" | "none",
                    path: cookie.path || '/',
                    maxAge: cookie.maxAge
                });
            })
        }

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
    }
    return { success: false, message: "Network Error" }
}

export const register = async (data: { email: string, name: string, password: string }) => {
    try {
        const response = await serverApi.post('/auth/register', data)
        const setCookieHeader = response.headers['set-cookie'];

        if (setCookieHeader && setCookieHeader.length > 0) {
            const parsedCookies = setCookie(setCookieHeader)

            const cookieStore = await cookies();

            parsedCookies.forEach((cookie) => {
                cookieStore.set(cookie.name, cookie.value, {
                    httpOnly: cookie.httpOnly,
                    secure: cookie.secure,
                    sameSite: cookie.sameSite as "lax" | "strict" | "none",
                    path: cookie.path || '/',
                    maxAge: cookie.maxAge
                });
            })

        }

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }

}


export const currentUser = async () => {

    try {
        const response = await serverApi.get("/auth/authUser");
        return response.data.success ? response.data.data : null;

    } catch (error) {
        return null;
    }

}