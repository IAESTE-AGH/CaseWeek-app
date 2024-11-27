import axios from "axios"
import { env } from "@/services/env"

function getBasePath() {
    const apiUrl = env.API_BASE_URL as string

    // If the base URL ends with /api/, we can return it
    if (apiUrl.endsWith("/api/")) return env.API_BASE_URL
    // Otherwise we have to modfiy it to end with /api/
    else if (apiUrl.endsWith("/api")) return `${env.API_BASE_URL}/`
    else if (apiUrl.endsWith("/")) return `${env.API_BASE_URL}api/`
    else return `${env.API_BASE_URL}/api/`
}

// Data from .env file
export const $axios = axios.create({
    baseURL: getBasePath(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})
