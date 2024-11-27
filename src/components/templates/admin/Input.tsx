// Tools
import { TextField, styled } from "@mui/material"
// Styled components
export default styled(TextField)(({ theme }) => ({
    ".MuiInputBase-root": {
        minHeight: "50px",
        borderColor: "#000 !important",
        svg: {
            marginRight: "12px",
        },
        input: {
            padding: "12px 12px",
        },
    },
    fieldset: {
        borderColor: "#000 !important",
    },
}))
