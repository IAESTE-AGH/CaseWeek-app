// Types
import type { ButtonVariant } from "./@types"

export const themes: Record<ButtonVariant, { backgroundColor: string; color: string }> = {
    error: {
        backgroundColor: "#EF5350",
        color: "white",
    },
    primary: {
        backgroundColor: "#2196F3",
        color: "white",
    },
    secondary: {
        backgroundColor: "#FF8A65",
        color: "#fff",
    },
    success: {
        backgroundColor: "#4CAF50",
        color: "white",
    },
    transparent: {
        backgroundColor: "transparent",
        color: "#000",
    },
    contrast: {
        backgroundColor: "#000",
        color: "#fff",
    },
}
