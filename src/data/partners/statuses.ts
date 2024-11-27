import type { ExtendedPartnershipStatus, PartnershipStatus } from "./@types"
import type { OptionWithAlias } from "@/components/templates/admin/Select"

export const PARTNERSHIP_STATUSES: OptionWithAlias<PartnershipStatus>[] = [
    { value: "TRUE", alias: "Opublikowane" },
    { value: "FALSE", alias: "Nie opublikowane" },
]

export const EXTENDED_PARTNERSHIP_STATUSES: OptionWithAlias<ExtendedPartnershipStatus>[] = [
    { value: "ALL", alias: "Wszystkie statusy" }, //
    ...PARTNERSHIP_STATUSES,
]
