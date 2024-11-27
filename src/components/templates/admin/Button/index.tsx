// Tools
// Types
import type { ButtonVariant } from "./@types"
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button"
// Components
import Base from "./Base"

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
    variant?: ButtonVariant
    children: React.ReactNode
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { children, variant, ...propsToForwards } = props

    return (
        <Base
            componentVariant={props.variant ?? "primary"} //
            {...propsToForwards}
        >
            <span>{props.children}</span>
        </Base>
    )
}

export default Button
