// Tool
import { styled } from "@mui/material"
import { forwardRef, useRef } from "react"
// Types
import type { ButtonBaseProps } from "@/components/templates/admin/Button/Base"
// Components
import { NavLink } from "react-router-dom"
import ButtonBase from "@/components/templates/admin/Button/Base"

const InternalRedirectionBase = styled(ButtonBase)(({ theme }) => ({
    a: {
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        color: "inherit",
    },
}))

interface InternalRedirectionProps extends Partial<ButtonBaseProps> {
    to: string
    label?: string
    endAdornment?: React.ReactNode
    startAdornment?: React.ReactNode
}

const InternalRedirection = forwardRef<HTMLButtonElement, InternalRedirectionProps>((props, ref) => {
    const { label, to, startAdornment, endAdornment, ...propsToForward } = props

    const anchorRef = useRef<HTMLAnchorElement | null>(null)

    function onClick() {
        anchorRef.current?.click()
    }

    return (
        <InternalRedirectionBase
            componentVariant="transparent" //
            onClick={onClick}
            {...propsToForward}
            ref={ref}
        >
            <NavLink to={props.to} ref={anchorRef}>
                {startAdornment ?? <></>}
                {label ?? to}
                {endAdornment ?? <></>}
            </NavLink>
        </InternalRedirectionBase>
    )
})

InternalRedirection.displayName = "InternalRedirection"
export default InternalRedirection
