import type { SavePartner as SavePartnerInterface } from "@/@types/API"

/**
 * Convert CreatePartnerInterface to FormData
 * @param state  The state of the partner
 * @param fileInputRef The reference to the file input
 * @returns State converted to FormData
 */
export function convertCreatePartnerInterfaceToFormData(state: SavePartnerInterface, fileInputRef: React.RefObject<HTMLInputElement>): FormData {
    const formData = new FormData()

    // Required fields
    formData.append("name", state.name)
    formData.append("partnerType", state.partnerType)
    formData.append("published", state.published)
    formData.append("shortDescription", state.shortDescription)
    formData.append("websiteUrl", state.websiteUrl)
    formData.append("displayPriority", String(state.displayPriority))

    // Optional fields
    if (state.longDescription) formData.append("longDescription", state.longDescription)

    // Images
    if (fileInputRef.current?.files?.[0]) formData.append("logo", fileInputRef.current.files[0])

    return formData
}
