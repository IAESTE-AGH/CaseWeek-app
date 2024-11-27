// Tools
import { generateAliasFromValue } from "./utils/generateAliasFromValue"
// Types
import type { SxProps } from "@mui/material"
import type { ChangeEvent, HTMLAttributes, ReactNode } from "react"
// Material UI Components
import MenuItem from "@mui/material/MenuItem"
// Styled components
import StyledSelectBase from "./Base"

export interface OptionWithAlias<T> {
    value: T
    alias: string
}

type OnChangeEvent<T> = ChangeEvent<HTMLHtmlElement> & {
    target: {
        value: T
    }
}

interface StyledSelectProps<T> extends Omit<HTMLAttributes<HTMLSelectElement>, "onChange"> {
    value: T
    options: (T | OptionWithAlias<T>)[]

    onChange: (e: OnChangeEvent<T>) => void

    sx?: SxProps
    disabled?: boolean
    className?: string
    startAdornment?: ReactNode
    disableAutomaticallyGeneratedAlias?: boolean
    renderValue?: (value: T) => ReactNode
}

export default function StyledSelect<T extends number | string | Record<any, any>>(props: StyledSelectProps<T>) {
    const { options, sx, id, ...propsToForward } = props

    return (
        <StyledSelectBase
            {...(propsToForward as any)}
            componentsProps={{
                root: {
                    id: id,
                },
            }}
            // eslint-disable-next-line no-new-object
            sx={(theme) => (typeof sx === "function" ? sx(theme) : sx ?? new Object())}
        >
            {options.map((item, index) => {
                if (item instanceof Object) {
                    return (
                        <MenuItem value={item.value} key={index}>
                            {item.alias}
                        </MenuItem>
                    )
                }

                return (
                    <MenuItem value={item} key={index}>
                        {props.disableAutomaticallyGeneratedAlias !== true && typeof item === "string" ? generateAliasFromValue(item) : item}
                    </MenuItem>
                )
            })}
        </StyledSelectBase>
    )
}
