// Tools
import { themes } from "./buttonVariants"
import { alpha, styled } from "@mui/material"
// Types
import type { ButtonVariant } from "./@types"
// Components
import MuiButton from "@mui/material/Button"

export interface ButtonBaseProps {
    // Due to the default mui props, we need to use a bit more sophisticated variable name :/
    componentVariant: ButtonVariant
}

function shouldForwardProp(prop: string | keyof ButtonBaseProps) {
    return prop !== "componentVariant"
}

// Styled components
export default styled(MuiButton, { shouldForwardProp })<ButtonBaseProps>(({ theme, ...props }) => {
    const { backgroundColor, color } = themes[props.componentVariant]

    return {
        backgroundColor,
        color,
        transition: "all .3s",
        height: "50px",
        padding: "0 28px",
        border: `1px solid ${backgroundColor}`,
        "&>span": {
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
        },
        "&:hover": {
            backgroundColor,
            color,
            "&::after": {
                opacity: 0.16,
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
            border: `1px solid ${alpha("#000", 0.4)}`,
            background: "#999999",
            color: alpha("#000", 0.8),
        },

        svg: {
            fontSize: "28px",
        },
    }
})
