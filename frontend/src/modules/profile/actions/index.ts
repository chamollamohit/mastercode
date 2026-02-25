import { serverApi } from "@/lib/axios-server"
import axios from "axios"

export const getUserProfile = async () => {
    try {
        const data = await serverApi.get('/user/get-user-details')
        return data.data
    } catch (error) {
        if (axios.isAxiosError(error))
            return error.response?.data

        return { success: false, message: "Network  Error" }
    }
}