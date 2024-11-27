// Types
import type { LengthRestrictions } from "@/@types/restrictions"

type AddPartnerFormFieldName = "name" | "shortDescription" | "longDescription" | "websiteUrl"

export const RESTRICTIONS: LengthRestrictions<AddPartnerFormFieldName> = {
    name: { min: 3, max: 64 },
    shortDescription: { min: 24, max: 256 },
    longDescription: { min: 32, max: 1024 },
    websiteUrl: { min: 3, max: 128 },
}
