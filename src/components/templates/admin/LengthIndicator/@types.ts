// Types
import type { LengthIndicatorProps } from "./LengthIndicator"
import type { SxProps } from "@mui/material"
import type { HTMLAttributes, ReactNode } from "react"

export interface WrapperWithWitdthIndicatorProps extends Pick<LengthIndicatorProps, "currentLength" | "max" | "min"> {
    children: ReactNode

    column?: boolean
    wrapperProps?: { sx?: SxProps } & HTMLAttributes<HTMLSpanElement>
}
