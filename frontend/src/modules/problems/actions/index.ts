"use server"

import { serverApi } from "@/lib/axios-server"
import axios from "axios"
import { revalidatePath } from "next/cache"


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

export const createProblem = async (data) => {
    try {
        const response = await serverApi.post('/problem/create', { ...data })
        revalidatePath('/problems')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }
}

export const getProblemById = async (problemId: string) => {
    try {
        const response = await serverApi.get(`/problem/get-problem/${problemId}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }
}

export const executeCode = async ({ code,
    language_id,
    stdin,
    expected_outputs,
    problemId }: {
        code: string,
        language_id: number,
        stdin: string[],
        expected_outputs: string[],
        problemId: string
    }) => {
    try {
        const response = await serverApi.post('/execute/', { source_code: code, language_id, stdin, expected_outputs, problemId })
        revalidatePath('/problem')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }
    }
}


export const getAllSubmissionByCurrentUserForProblem = async (problemId: string) => {
    try {
        const respone = await serverApi.get(`/submissions/get-submissions/${problemId}`)

        return respone.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { success: false, message: "Network Error" }

    }
}