// Tools
import { alpha, styled } from "@mui/material"
// Types
import type { SxProps } from "@mui/material"
// Other components
import SmoothConditionalRender from "@/components/SmoothConditionalRender"
// Styled components
const LengthIndicatorBase = styled("span", {
    shouldForwardProp: (prop: string) => !["invalid"].includes(prop),
})<{
    invalid: boolean
}>(({ theme, ...props }) => ({
    fontSize: "14px",
    color: alpha(theme.palette.text.primary, 0.6),
    display: "flex",
    gap: "6px",
    cursor: "default",
    width: "100%",
    fontWeight: 500,

    transition: "all .3s",
    ...(props.invalid && {
        opacity: 1,
        color: alpha(theme.palette.error.main, theme.palette.mode === "light" ? 0.6 : 1),
    }),

    "span.current-length": {
        width: "64px",
    },

    "span.communiques-wrapper": {
        width: "240px",
        position: "relative",
    },
}))

export const LENGTH_INDICATOR_CSS_NAME: string = "length-indicator"

const MESSAGES: Record<string, string> = {
    VALUE_TOO_SHORT: "Minimalna długość to",
    VALUE_TOO_LONG: "Maksymalna długość to",
}

export interface LengthIndicatorProps {
    currentLength: number
    max: number
    min: number

    sx?: SxProps
    disableErrorMessages?: boolean
}

const LengthIndicator: React.FunctionComponent<LengthIndicatorProps> = (props) => {
    const { currentLength, max, min } = props

    const valueIsTooShort: boolean = currentLength > 0 && currentLength < min
    const valueIsTooLong: boolean = currentLength > max

    return (
        <LengthIndicatorBase
            invalid={valueIsTooLong || valueIsTooShort} //
            sx={props.sx}
            className={LENGTH_INDICATOR_CSS_NAME}
        >
            <span className="current-length">{`${currentLength} / ${max}`}</span>

            <span className="communiques-wrapper">
                <SmoothConditionalRender when={valueIsTooLong}>
                    <span>{`${MESSAGES.VALUE_TOO_LONG} ${max}`} </span>
                </SmoothConditionalRender>

                <SmoothConditionalRender when={valueIsTooShort}>
                    <span>{`${MESSAGES.VALUE_TOO_SHORT} ${min}`} </span>
                </SmoothConditionalRender>
            </span>
        </LengthIndicatorBase>
    )
}

export default LengthIndicator
