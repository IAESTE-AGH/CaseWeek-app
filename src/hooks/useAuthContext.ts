import { AuthContext } from "@/contexts/Auth"
import { useContext } from "react"

export function useAuthContext() {
    return useContext(AuthContext)
}
