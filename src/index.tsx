import "./index.css"
import "react-toastify/dist/ReactToastify.css"

import { router } from "./router"
import { material } from "./material"

import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "@mui/material"
import { ToastContainer } from "react-toastify"
import { RouterProvider } from "react-router-dom"
import { DialogProvider } from "./contexts/Modals"
import { QueryClientProvider, QueryClient } from "react-query"
import { AuthContextProvider } from "@/contexts/Auth/Provider"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        {/* MUI theme context */}
        <ThemeProvider theme={material}>
            {/* React use query context */}
            <QueryClientProvider client={queryClient}>
                {/* App's authentication details context */}
                <AuthContextProvider>
                    {/* App's dialog context */}
                    <DialogProvider>
                        <RouterProvider router={router} />
                        <ToastContainer position="bottom-right" pauseOnHover={false} />
                    </DialogProvider>
                </AuthContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
)
