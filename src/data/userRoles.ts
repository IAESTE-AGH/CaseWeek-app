import type { User } from "@/@types/API"
import type { OptionWithAlias } from "@/components/templates/admin/Select"

export type UserRole = User["role"]
export type ExtendedUserRole = UserRole | "ALL"

export const USER_ROLES: OptionWithAlias<User["role"]>[] = [
    {
        alias: "Admin",
        value: "ADMIN",
    },
    {
        alias: "Koordynator globalny",
        value: "GENERAL_COORDINATOR",
    },
    {
        alias: "Koordynator lokalny",
        value: "LOCAL_COORDINATOR",
    },
    {
        alias: "Członek IAESTE",
        value: "IAESTE_MEMBER",
    },
    {
        alias: "Student",
        value: "STUDENT",
    },
]

export const USER_ROLES_EXTENDED: OptionWithAlias<ExtendedUserRole>[] = [
    {
        alias: "Wszystkie role",
        value: "ALL",
    },
    ...USER_ROLES,
]

export function getUserRoleAlias(role: UserRole) {
    return USER_ROLES.find((option) => option.value === role)?.alias ?? role
}
