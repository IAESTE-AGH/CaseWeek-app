// Types
import type { SavePartner as SavePartnerInterface } from "@/@types/API"

export interface APIRequestParams {
    url: string
    method: "POST" | "PUT"
    mutationKey: string
    successMessage: string
}

export interface PartnerCompoundedData {
    details: SavePartnerInterface
    logoUrl: string
}
