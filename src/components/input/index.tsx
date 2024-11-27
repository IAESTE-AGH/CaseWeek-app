import { InputBase, styled } from "@mui/material";

export const Input = styled(InputBase)({
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "0.3s",
    backgroundColor: "#fff",

    "&.Mui-focused": {
        borderColor: "#8f7148",
    },
    "&:disabled": {
        background: "#f0f0f0",
    },
})