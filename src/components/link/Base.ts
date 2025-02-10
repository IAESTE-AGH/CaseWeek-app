import { styled } from "@mui/material"
import { Link } from "react-router-dom"

export const BaseLink = styled(Link)({
    color: "#8f7148",
    position: "relative",

    "&:hover, &:focus": {
        color: "#705a3f",
    },

    "&::before": {
        content: "''",
        position: "absolute",
        top: "-3px",
        left: "-6px",
        width: "calc(100% + 12px)",
        height: "calc(100% + 6px)",
        borderRadius: "4px",
        backgroundColor: "transparent",
        zIndex: -1,
        transition: "background-color 0.3s",
    },

    "&:hover::before, &:focus::before": {
        backgroundColor: "#f7f3f0",
    },
})
