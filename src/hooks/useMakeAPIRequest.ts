import { useQuery } from "react-query"
import { $axios } from "@/services/axios"

import type { AxiosHeaders, AxiosError } from "axios"
import { useEffect, useRef } from "react"
import { useSimpleReducer } from "./useSimpleReducer"

interface UseMakeAPIRequestParams<T> {
    immediate?: boolean

    /** HTTP method */
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

    /** API endpoint path */
    path: string

    /** Path parameters */
    pathParams?: {
        name: string //
        value: string | number | boolean
        condition?: boolean
    }[]

    /** Callback function to format received data */
    formatReceivedData?: (rawData: any) => T

    /** Query key for react-query which will be used to cache the response */
    queryKey: string

    /** Request body*/
    body?: any

    /** Request headers */
    headers?: AxiosHeaders

    /** Callback function to be executed when the request is successful */
    onSuccess?: (data: T) => void

    /** Callback function to be executed when the request fails */
    onError?: (params: { errorCode: number; errorMessage: string }) => void
}

export namespace UseMakeAPIRequestResult {
    interface Success<T> {
        status: "success"
        data: T
    }

    interface Error {
        status: "error"
        code: number
        message: string
    }

    interface Loading {
        status: "loading"
    }

    export type Result<T> = Success<T> | Error | Loading
}

/**
 * Merge path parameters into a single string
 *
 * Example:
 * ```ts
 * mergePathParams([
 *    { name: "page", value: 1 },
 *    { name: "size", value: 20 },
 * ])
 * ```
 * And output:
 * **?page=1&size=20**
 */
function mergePathParams(pathParams: UseMakeAPIRequestParams<any>["pathParams"]): string {
    // Return empty string if there are no path parameters
    if (pathParams === undefined || pathParams.length === 0) return ""

    const urlSearchParams = new URLSearchParams()

    // Append path parameters to URLSearchParams object only if their condition is met
    pathParams
        .filter((param) => param.condition ?? true) //
        .forEach((param) => urlSearchParams.append(param.name, param.value.toString()))

    return `?${urlSearchParams.toString()}`
}

/**
 *
 * Auxiliary hook to make API requests using axios and react-query
 *
 * @param params An object containing the request parameters such as selected REST method, path, queryKey, data and headers
 * @returns Processed response data or error
 *
 * ### Example of usage:
 * ```ts
 *  const [ result ] = useMakeAPIRequest({
 *      method: "GET",
 *     path: "/api/workshops",
 *     queryKey: "repoData",
 * })
 * ```
 */
export function useMakeAPIRequest<T>(params: UseMakeAPIRequestParams<T>): [UseMakeAPIRequestResult.Result<T>, () => Promise<void>] {
    const _previouslyHandledRequest = useRef<string | null>(null)

    const [result, setResult] = useSimpleReducer<UseMakeAPIRequestResult.Result<T>>({ status: "loading" })

    const mergedPathParams: string = mergePathParams(params.pathParams)

    const { data, status, error, remove } = useQuery({
        queryKey: [params.queryKey, mergedPathParams],
        enabled: params.immediate ?? true,
        retry: false,
        queryFn: async () => {
            return await $axios({
                method: params.method,
                url: params.path + mergedPathParams,
                data: params.body,
                headers: params.headers,
            })
        },
    })

    // Handle response
    useEffect(() => {
        // Check if an identical request has already been handled
        const requestUrl: string = data?.request?.responseURL ?? ""
        const currentUrlCombinedWithStatus: string = `${requestUrl}--${status}`

        if (_previouslyHandledRequest.current === currentUrlCombinedWithStatus || status === "idle") return
        else _previouslyHandledRequest.current = currentUrlCombinedWithStatus
        // done checking

        let result: UseMakeAPIRequestResult.Result<T> | null = null

        switch (status) {
            case "error":
                const { response } = error as AxiosError

                // Detect CORS error
                if (!response) {
                    result = {
                        status: "error",
                        code: 0,
                        message: `CORS Error: Method: ${params.method}, path: ${params.path}`,
                    }
                }
                // Assign error response to result
                else {
                    result = {
                        status: "error",
                        code: response?.status ?? 0,
                        message: response && response.data && "message" in (response.data as any) ? (response.data as any).message : "Unknown error",
                    }
                }

                // Call onError callback if it exists
                if (params.onError) params.onError({ errorCode: result.code, errorMessage: result.message })

                break

            case "success":
                // Assign success response to result

                result = {
                    status: "success",
                    data: params.formatReceivedData ? params.formatReceivedData(data.data) : data.data,
                }

                // Call onSuccess callback if it exists
                if (params.onSuccess) params.onSuccess(result.data)
                break
        }

        if (result !== null) setResult(result)
    }, [data, error, params, setResult, status])

    async function refetch() {
        setResult({ status: "loading" })
        _previouslyHandledRequest.current = null
        remove()
    }

    return [result, refetch]
}
