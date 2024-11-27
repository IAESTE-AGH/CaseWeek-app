import { createContext } from "react"
import { ShowDialogHandler } from "./types"

export const DialogContext = createContext<ShowDialogHandler>(() => {
    throw new Error("Component is not wrapped with a DialogProvider.")
})
