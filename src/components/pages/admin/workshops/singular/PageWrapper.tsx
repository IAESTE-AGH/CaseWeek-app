// Tools
import { styled } from "@mui/material"
// Styled components
export default styled("section")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "4fr 8fr",
    gridTemplateRows: "auto auto auto 1fr",
    minHeight: "700px",
    gap: "12px",
    ".settings": {
        gridArea: "1 / 1 / 2 / 2",
    },
    ".admisions": {
        gridArea: "2 / 1 / 3 / 2",
    },
    ".creator": {
        gridArea: "3 / 1 / 4 / 2",
    },
    ".info": {
        gridArea: "1 / 2 / 5 / 3",
    },
    "&>*": {
        padding: "12px 24px",
        boxSizing: "border-box",
    },
}))
