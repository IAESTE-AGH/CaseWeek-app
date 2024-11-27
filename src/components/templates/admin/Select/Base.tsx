// Tools
import { styled } from "@mui/material"
// Material UI Components
import Select from "@mui/material/Select"
// Styled components

export default styled(Select)(({ theme, ...props }) => {
    return {
        fontSize: "16px",
        color: "#000",
        background: "#fff",
        height: "50px",
        fieldset: {
            borderColor: "#000",
            transition: "border-color .2s",
        },
        "&:hover": {
            fieldset: {
                borderColor: `#000 !important`,
            },
        },
        "@media (max-width:500px)": {
            width: "100%",
        },
        ".MuiSelect-select": {
            padding: "12px 16px",
        },
        svg: {
            color: "inherit !important",
        },

        "&.Mui-disabled": {
            fieldset: {
                border: "1px solid #000 !important",
            },
        },
    }
})
