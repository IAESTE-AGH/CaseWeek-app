import type { ExtendedPartnerType, PartnerType } from "./@types"
import type { OptionWithAlias } from "@/components/templates/admin/Select"

export const PARTNERSHIP_VARIANTS: OptionWithAlias<PartnerType>[] = [
    { value: "HONORABLE_PATRONAGE", alias: getPartnerTypeInPolish("HONORABLE_PATRONAGE") },
    { value: "SPONSOR", alias: getPartnerTypeInPolish("SPONSOR") },
    { value: "MEDIA_PATRONAGE", alias: getPartnerTypeInPolish("MEDIA_PATRONAGE") },
    { value: "OTHER", alias: getPartnerTypeInPolish("OTHER") },
]

export const EXTENDED_PARTNERSHIP_VARIANTS: OptionWithAlias<ExtendedPartnerType>[] = [
    { value: "ALL", alias: "Wszyskie typy" }, //
    ...PARTNERSHIP_VARIANTS,
]

export function getPartnerTypeInPolish(type: PartnerType): string {
    switch (type) {
        case "HONORABLE_PATRONAGE":
            return "Honorowy"
        case "SPONSOR":
            return "Sponsor"
        case "MEDIA_PATRONAGE":
            return "Medialny"
        case "OTHER":
            return "Inny"
        default:
            return "Nieznany"
    }
}

export function getColorForPartnerType(type: PartnerType): string {
    switch (type) {
        case "HONORABLE_PATRONAGE":
            return "#32CD32"
        case "SPONSOR":
            return "#FF8C00"
        case "MEDIA_PATRONAGE":
            return "#FF4500"
        case "OTHER":
            return "#FF6347"
        default:
            return "black"
    }
}
