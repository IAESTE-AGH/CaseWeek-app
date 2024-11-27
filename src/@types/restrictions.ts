export interface SingleLengthRestriction {
    min: number //
    max: number
}

/** A type that represents the restrictions of a string, primarily used for validation in admin panel forms */
export type LengthRestrictions<T extends string> = Record<T, SingleLengthRestriction>
