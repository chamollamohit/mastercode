"use server"

import { serverApi } from "@/lib/axios-server"
import axios from "axios"
import { revalidatePath } from "next/cache"


export const createPlaylist = async (data: { name: string, description: string }) => {
    try {
        const response = await serverApi.post('/playlist/create-playlist', data)
        revalidatePath('/playlists')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data

        return { success: false, message: "Network  Error" }
    }
}

export const addToPlaylist = async (problemId: string, playlistId: string) => {
    try {
        const response = await serverApi.post(`/playlist/${playlistId}/add-problem`, { problemId })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data

        return { success: false, message: "Network  Error" }
    }
}

export const getAllPlaylist = async () => {
    try {
        const response = await serverApi.get("/playlist")
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data

        return { success: false, message: "Network  Error" }
    }
}

export const deletePlaylist = async (playlistId: string) => {
    try {
        const response = await serverApi.delete(`/playlist/${playlistId}`)
        revalidatePath("/playlists");
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data

        return { success: false, message: "Network  Error" }
    }
}