import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"

interface UseURLQueryParamStateProps<T extends string | number> {
    /* The name of the query parameter to use */
    key: string
    /* The default value to use if the query parameter is not present */
    defaultValue: T
}

interface UseURLQueryParamStateResult<T extends string | number> {
    // Core

    /* The current value of the state */
    value: T
    /* A function to update the state */
    update: Dispatch<SetStateAction<T>>

    // Additional, but handy

    /* Check if the current value is the default value */
    isDefault: boolean
    /* A function to reset the state to the default value */
    reset: () => void
}

/**
 * A hook that allows you to store a value in the URL query parameters and keep it in sync with the state.
 */
export function useURLQueryParamState<T extends string | number>({ defaultValue, key }: UseURLQueryParamStateProps<T>): UseURLQueryParamStateResult<T> {
    const [value, setValue] = useState<T>(getURLQueryParamValue<T>(key) ?? defaultValue)

    // Start updating the URL when the value changes
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        // If the value is the same as the default value, remove the query parameter in order to keep the URL clean
        if (value === defaultValue) {
            params.delete(key)
        }
        // Otherwise, set the query parameter to the value
        else {
            params.set(key, value.toString())
        }

        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`)
    }, [defaultValue, key, value])

    return {
        value,
        update: setValue,
        isDefault: value === defaultValue,
        reset: () => setValue(defaultValue),
    }
}

export function getURLQueryParamValue<T extends string | number>(key: string): T | null {
    const params = new URLSearchParams(window.location.search)
    const value = params.get(key)

    return value === null ? null : (value as unknown as T)
}
