import { styled } from "@mui/material"

interface BaseSectionProps {
    height?: number
    minHeight?: number
    backgroundImage?: string
    background?: string
    noPadding?: boolean
}

export const BaseSection = styled("section")<BaseSectionProps>((props) => {
    const background = props.backgroundImage ? `url(${props.backgroundImage})` : props.background || "none"

    return {
        width: "100%",
        boxSizing: "border-box",
        padding: props.noPadding ? "0px" : "4rem 4rem",
        background: background,
        backgroundSize: "cover",
        height: props.height ? `${props.height}px` : "auto",
        minHeight: props.minHeight ? `${props.minHeight}px` : "auto",
        position: "relative",
        overflow: "hidden",

        "& > *": {
            margin: "0 auto",
            maxWidth: props.noPadding ? "unset" : "150ch",
        },
    }
})
