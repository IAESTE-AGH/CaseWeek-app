import { $axios } from "@/services/axios"

import { useMutation } from "react-query"
import { AuthContext } from "."
import { useCurrentUserReducer } from "./hooks/useCurrentUserReducer"

import type { User } from "@/@types/API"

import { useMakeAPIRequest } from "@/hooks/useMakeAPIRequest"

export const AuthContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = (props) => {
    const currentUser = useCurrentUserReducer()

    const { mutateAsync: makeLoginRequest } = useMutation({
        mutationKey: "login",
        mutationFn: async () => {
            return await $axios.post("/auth/login", {
                email: "admin@iaeste.pl",
                password: "password",
            })
        },
        onSuccess: ({ data }) => {
            currentUser.actions.setAuthenticated(data)
            console.log("🟩 AuthProvider: Logged in successfully, admin access granted")
        },
        onError: (error) => {
            console.error("🟥 AuthProvider: Error while logging in: ")
        },
    })

    useMakeAPIRequest<User>({
        method: "GET",
        path: "/auth/current-user",
        queryKey: "current-user-info",
        onSuccess: (data) => {
            console.log("🟩 AuthProvider: Cookie file's been detected, logged in successfully")
            currentUser.actions.setAuthenticated(data)
        },
        onError: (error) => {
            console.log("🟥 AuthProvider: No cookie file detected, setting state to unauthenticated")
            // ! TEMPORARY SOLUTION
            // Ideally, we would want to set state to unauthenticated and call it a day
            currentUser.actions.setUnauthenticated()

            // ! TO BE REMOVED
            // But for now we will just make a login request
            // makeLoginRequest()
        },
    })

    return (
        <AuthContext.Provider value={currentUser.state}>
            {props.children}
            {/*  */}
        </AuthContext.Provider>
    )
}
