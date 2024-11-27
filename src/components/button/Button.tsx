import MuiButton from "@mui/material/ButtonBase"
import { styled } from "@mui/system"
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button"
import React from "react"

const ButtonBase = styled(MuiButton)<MuiButtonProps>(() => {
    return {
        backgroundColor: "#DAB88B",
        color: "black",
        transition: "background-color .3s, opacity .3s",
        padding: "1rem 3rem",
        borderRadius: "1000000px",
        fontSize: "1.25rem",
        fontWeight: "normal",
        fontFamily: "League Spartan, sans-serif",
        letterSpacing: "0.2em",
        textTransform: "unset",
        position: "relative",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

        "&:hover": {
            backgroundColor: "#DAB88B",

            "&::after": {
                opacity: 0.3,
            },
        },

        "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            borderRadius: "inherit",
            opacity: 0,
            transition: "opacity .3s",
        },

        "&.Mui-disabled": {
            border: `1px solid #000`,
            background: "#999999",
            color: "#000",
        },
    }
})

// don't know, for some reason it doesn't want to work with sx prop
interface ButtonProps extends Omit<MuiButtonProps, "sx"> {
    title: string
}

export function Button({ title, ...propsToForward }: ButtonProps) {
    return <ButtonBase {...propsToForward}>{title}</ButtonBase>
}
