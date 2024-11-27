import type { WorkshopMemberStatus } from "@/@types/API"
import type { OptionWithAlias } from "@/components/templates/admin/Select"

export type ExtendedWorkshopMemberStatus = WorkshopMemberStatus | "ALL"

export const WORKSHOP_MEMBER_STATUSES: OptionWithAlias<WorkshopMemberStatus>[] = [
    { value: "CANDIDATE", alias: "Kandydaci" },
    { value: "CONFIRMED", alias: "Oczekujące" },
    { value: "QUALIFIED", alias: "Zakwalifikowane" },
    { value: "REJECTED", alias: "Odrzucone" },
    { value: "RESERVE", alias: "Rezerwowe" },
    { value: "RESIGNED", alias: "Rezygnacje" },
]

export const EXTENDED_WORKSHOP_MEMBER_STATUSES: OptionWithAlias<ExtendedWorkshopMemberStatus>[] = [
    { value: "ALL", alias: "Wszystkie" }, //
    ...WORKSHOP_MEMBER_STATUSES,
]

export function getWorkshopMemberStatusAlias(status: ExtendedWorkshopMemberStatus): string {
    const foundStatus = EXTENDED_WORKSHOP_MEMBER_STATUSES.find((statusOption) => statusOption.value === status)
    // Ensure that status is found
    if (!foundStatus) throw new Error(`Status "${status}" not found in EXTENDED_WORKSHOP_MEMBER_STATUSES`)

    return foundStatus.alias
}

export function getWorkshopMemberColor(status: ExtendedWorkshopMemberStatus): string {
    switch (status) {
        case "CANDIDATE":
            return "#3F51B5"
        case "CONFIRMED":
            return "#A1887F"
        case "QUALIFIED":
            return "#7CB342"
        case "REJECTED":
            return "#E57373"
        case "RESERVE":
            return "#FFB74D"
        case "RESIGNED":
            return "#9575CD"
        case "ALL":
            return "#607D8B"

        default:
            throw new Error(`Status "${status}" not found in WORKSHOP_MEMBER_STATUSES`)
    }
}
