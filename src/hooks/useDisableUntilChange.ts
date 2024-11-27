import { useEffect, useRef, useState } from "react"

interface UseDisableUntilChangeResult<T> {
    /**
     * Should actions be disabled
     */
    isDisabled: boolean

    /**
     * Block actions until the dependencies change again
     */
    block(newDependencies: T): void
}

export function useDisableUntilChange<T extends Array<any>>(defaultValue: boolean, dependencies: T): UseDisableUntilChangeResult<T> {
    const [isDisabled, setIsDisabled] = useState<boolean>(defaultValue)
    const _savedDependencies = useRef<string>(JSON.stringify(dependencies))

    useEffect(() => {
        // If dependencies are the same as before, disable the button
        if (JSON.stringify(dependencies) === _savedDependencies.current) {
            setIsDisabled(true)

            return
        }

        setIsDisabled(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    function block(newDependencies: T) {
        setIsDisabled(true)

        // Save the dependencies so that we can compare them later
        _savedDependencies.current = JSON.stringify(newDependencies)
    }

    return {
        isDisabled,
        block,
    }
}
