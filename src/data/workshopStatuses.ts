import type { Workshop } from "@/@types/API"
import type { OptionWithAlias } from "@/components/templates/admin/Select"

export type WorkshopStatus = Workshop["status"]
export type ExtendedWorkshopStatus = Workshop["status"] | "ALL"

export const WORKSHOPS_STATUSES: OptionWithAlias<WorkshopStatus>[] = [
    { value: "PUBLISHED", alias: "Opublikowany" },
    { value: "UNPUBLISHED", alias: "Nieopublikowany" },
    { value: "FINISHED", alias: "Zakończony" },
    { value: "CANCELLED", alias: "Anulowany" },
]

export const EXTENDED_WORKSHOPS_STATUSES: OptionWithAlias<ExtendedWorkshopStatus>[] = [
    { value: "ALL", alias: "Wszystkie" }, //
    ...WORKSHOPS_STATUSES,
]

export function getWorkshopStatusAlias(status: Workshop["status"]): string {
    const foundStatus = WORKSHOPS_STATUSES.find((statusOption) => statusOption.value === status)
    // Ensure that status is found
    if (!foundStatus) throw new Error(`Status "${status}" not found in WORKSHOPS_STATUSES`)

    return foundStatus.alias
}

export function getWorkshopStatusColor(status: Workshop["status"]): string {
    switch (status) {
        case "PUBLISHED":
            return "#4CAF50"
        case "UNPUBLISHED":
            return "#2196F3"
        case "FINISHED":
            return "#777777"
        case "CANCELLED":
            return "#FF5722"
        default:
            throw new Error(`Status "${status}" not found in WORKSHOPS_STATUSES`)
    }
}
