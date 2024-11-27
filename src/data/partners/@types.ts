import type { PartnerType } from "@/@types/API"

export { PartnerType }
export type ExtendedPartnerType = PartnerType | "ALL"

export type PartnershipStatus = "TRUE" | "FALSE"
export type ExtendedPartnershipStatus = PartnershipStatus | "ALL"
