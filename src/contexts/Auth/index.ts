import { createContext } from "react"

import type { User } from "@/@types/API"

export namespace I_AuthContext {
    interface Authenticated {
        status: "authenticated"
        currentUser: User
    }

    interface Unauthenticated {
        status: "unauthenticated"
        currentUser: null
    }

    interface Loading {
        status: "loading"
        currentUser: null
    }

    export type State = Authenticated | Unauthenticated | Loading
}

export const AuthContext = createContext<I_AuthContext.State>({} as I_AuthContext.State)
