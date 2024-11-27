// Tools
import { SxProps, styled } from "@mui/material"
// Styled components
interface Props {
    columnsWidths: number[]
    thereAreColumnActions: boolean
}

/** Compute the width of the table */
function computeWidth(width: number, thereAreColumnActions: boolean): number {
    return thereAreColumnActions ? (width / 100) * 94 : width
}

function shouldForwardProp(prop: string | keyof Props): boolean {
    return !["columnsWidths", "thereAreColumnActions"].includes(prop as any)
}

export default styled("table", { shouldForwardProp })<Props>(({ theme, ...props }) => ({
    margin: "36px 0",
    width: "100%",
    borderSpacing: "4px",
    position: "relative",
    thead: {
        position: "sticky",
        top: "12px",
        left: 0,
        zIndex: 1,
        "&::after": {
            content: "''",
            position: "absolute",
            top: "-12px",
            left: 0,
            width: "100%",
            height: "12px",
            background: "#fff",
        },
    },
    th: {
        padding: "22px 24px",
        background: "#000",
        color: "#fff",
        textAlign: "left",
        fontWeight: "normal",
        fontSize: "18px",
    },
    td: {
        padding: "12px 24px",
        background: "#fff",
        "&>div, &>a>div": {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        ".MuiIconButton-root": {
            transition: "all 0.3s",
            "&:hover": {
                color: "#000",
            },
        },

        a: {
            textDecoration: "none",
        },
    },
    "th, td": {
        boxSizing: "border-box",
        border: "1px solid #000",
        borderRadius: "2px",

        ...(props.columnsWidths.reduce((acc, width, index) => {
            acc[`&:nth-of-type(${index + 1})`] = {
                width: `${computeWidth(width, props.thereAreColumnActions)}%`,
            }
            return acc
        }, {} as Record<string, any>) as SxProps),
    },

    "tr:nth-of-type(2n) td": {
        background: "#f5f5f5",
    },
}))
