"use server"

import { serverApi } from "@/lib/axios-server"
import axios from "axios"


export const getAllProblems = async () => {
    try {
        const response = await serverApi.get('/problem/get-all-problem')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }
}