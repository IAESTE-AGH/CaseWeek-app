// Tools
import { useMemo } from "react"

// Types
import type { SingleLengthRestriction } from "@/@types/restrictions"

namespace PossibleRequirements {
    export interface Length extends SingleLengthRestriction {
        value: string
    }

    export interface JustPresence {
        value: string | null
    }

    export type Any = Length | JustPresence

    export function checkIfFieldIsLengthRequirnemnt(requirement: Any): requirement is Length {
        return "min" in requirement
    }
}

interface UseFormSubmissionDisabilityProps {
    requirnments: PossibleRequirements.Any[]
}

function doesNotMatchTheirRequirements(requirnment: PossibleRequirements.Any): boolean {
    if (PossibleRequirements.checkIfFieldIsLengthRequirnemnt(requirnment)) {
        return doesNotMatchLengthRequirements(requirnment)
    }

    return doesNotMatchPresenceRequirements(requirnment)
}

function doesNotMatchPresenceRequirements({ value }: PossibleRequirements.JustPresence): boolean {
    return value === null
}

function doesNotMatchLengthRequirements({ value, min, max }: PossibleRequirements.Length): boolean {
    const { length } = value
    return length < min || length > max
}

/**
 * Accerts that all fields match provided length requirements and returns a boolean value accordingly.
 *
 * @returns {boolean} disabled- true if any of the fields does not match their requirements, false otherwise
 */
export function useFormSubmissionDisability({ requirnments }: UseFormSubmissionDisabilityProps): boolean {
    return useMemo<boolean>(() => {
        return requirnments.some(doesNotMatchTheirRequirements)
    }, [requirnments])
}
