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
            const cookieString = setCookieHeader[0];

            const parts = cookieString.split(';').map(part => part.trim());

            const [nameValue] = parts;
            const [name, value] = nameValue.split('=');

            const maxAgePart = parts.find(p => p.toLowerCase().startsWith('max-age='));
            const maxAge = maxAgePart ? parseInt(maxAgePart.split('=')[1]) : undefined;

            const cookieStore = await cookies();

            cookieStore.set(name, value, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',
                path: '/',
                maxAge: maxAge
            });
        }

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }

}