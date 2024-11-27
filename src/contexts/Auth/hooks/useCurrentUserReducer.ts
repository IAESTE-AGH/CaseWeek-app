import { useReducer } from "react"

import { I_AuthContext } from ".."
import type { User } from "@/@types/API"

namespace CurrentUserReducer {
    type SetAuthenticatedUserAction = {
        type: "SET_AUTHENTICATED"
        payload: User
    }

    type SetUnauthenticatedUserAction = {
        type: "SET_UNAUTHENTICATED"
    }

    type Action = SetAuthenticatedUserAction | SetUnauthenticatedUserAction

    export const reducer = (state: I_AuthContext.State, action: Action): I_AuthContext.State => {
        switch (action.type) {
            case "SET_AUTHENTICATED":
                return {
                    status: "authenticated",
                    currentUser: action.payload,
                }
            case "SET_UNAUTHENTICATED":
                return {
                    status: "unauthenticated",
                    currentUser: null,
                }
            default:
                return state
        }
    }
}

export const useCurrentUserReducer = () => {
    const [state, dispatch] = useReducer(CurrentUserReducer.reducer, {
        status: "loading",
        currentUser: null,
    })

    function setAuthenticated(user: User) {
        dispatch({ type: "SET_AUTHENTICATED", payload: user })
    }

    function setUnauthenticated() {
        dispatch({ type: "SET_UNAUTHENTICATED" })
    }

    return {
        state, //
        actions: {
            setAuthenticated,
            setUnauthenticated,
        },
    }
}
