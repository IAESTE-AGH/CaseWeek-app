import { alpha } from "@mui/material"
import { createTheme } from "@mui/material/styles"
// Types

export const material = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "16px",
                    fontWeight: 400,
                    background: alpha("#000", 0.75),
                    padding: "8px 16px",
                    cursor: "default",
                    borderRadius: "3px",
                    userSelect: "none",
                },
            },
        },
    },
})
