import { I_AuthContext } from "@/contexts/Auth";

export function isAdmin(state: I_AuthContext.State) {
    return state.status === "authenticated" && state.currentUser.role !== "STUDENT" && state.currentUser.role !== "IAESTE_MEMBER"
}