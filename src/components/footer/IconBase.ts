import { styled } from "@mui/material"
import React from "react"

export const IconBase = styled("a")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: "8px",
    backgroundColor: "transparent",
    border: "2px solid white",
    transition: "border 0.2s",

    "&:hover": {
        cursor: "pointer",
        border: "2px solid #DAB88B",
    },
})
