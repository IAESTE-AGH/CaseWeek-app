// Tools
import { styled } from "@mui/material"
import { getUserRoleAlias } from "@/data/userRoles"
// Types
import { User } from "@/@types/API"
import type { SxProps } from "@mui/material"
import type { FunctionComponent } from "react"

const UserRoleBadgeBase = styled("span")(({ theme }) => ({
    fontSize: "12px",
    color: "red",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
}))

interface UserRoleBadgeProps {
    role: User["role"]
    /** Display full role name instead of its abbreviation */
    full?: boolean
}

type UserRoleWithBadge = Exclude<User["role"], "STUDENT">

const labels: Record<UserRoleWithBadge, string> = {
    ADMIN: "ADMIN",
    LOCAL_COORDINATOR: "KL",
    GENERAL_COORDINATOR: "KG",
    IAESTE_MEMBER: "IAESTE",
}

const stylesBasedOnRole: Record<UserRoleWithBadge, SxProps> = {
    IAESTE_MEMBER: {
        color: "#fff",
        backgroundColor: "#0A3E5A",
    },
    ADMIN: {
        color: "#fff",
        backgroundColor: "#000",
    },
    GENERAL_COORDINATOR: {
        color: "#fff",
        backgroundColor: "#F5AF00",
    },
    LOCAL_COORDINATOR: {
        color: "#fff",
        backgroundColor: "#D81E5B",
    },
}

const UserRoleBadge: FunctionComponent<UserRoleBadgeProps> = (props) => {
    if (props.role === "STUDENT") return <></>

    const valueToDisplay = props.full ? getUserRoleAlias(props.role) : labels[props.role]

    return (
        <UserRoleBadgeBase sx={stylesBasedOnRole[props.role]}>
            {/*  */}
            {valueToDisplay}
        </UserRoleBadgeBase>
    )
}

export default UserRoleBadge
