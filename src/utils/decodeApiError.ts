import type { AxiosError } from "axios"

interface DecodedApiError {
    /** Error code (note: NOT HTTP status code) */
    code: string
    /** HTTP status code, or "NOT_ESTABLISHED" if the response was not received */
    statusCode: number | "NOT_ESTABLISHED"
    /** Error message */
    message: string
}

export const decodeApiError = (error: AxiosError | { error: AxiosError }): DecodedApiError => {
    // We can pass either an AxiosError or an object containing an AxiosError (which is a default behavior of useQuery hook)
    if ("error" in error) error = error.error

    // Here we can handle custom error codes
    // ...

    return {
        code: error.code ?? "NOT_ESTABLISHED",
        statusCode: error.response?.status ?? "NOT_ESTABLISHED",
        message: error.message,
    }
}
