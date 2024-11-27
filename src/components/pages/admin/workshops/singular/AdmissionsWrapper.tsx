// Tools
import { styled } from "@mui/material"
// Styled components
export default styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "16px",
    "&>*": {
        width: "42%",
    },
    a: {
        textDecoration: "none",
    },
}))
