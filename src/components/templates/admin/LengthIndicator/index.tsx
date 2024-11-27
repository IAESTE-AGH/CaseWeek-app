// Types
import type { WrapperWithWitdthIndicatorProps } from "./@types"
// Other components
import LengthIndicator from "./LengthIndicator"
// Styled components
import WrapperWithLengthIndicatorBase from "./Base"

const WrapperWithWitdthIndicator: React.FunctionComponent<WrapperWithWitdthIndicatorProps> = (props) => {
    return (
        <WrapperWithLengthIndicatorBase
            column={props.column ?? true} //
            {...props.wrapperProps}
        >
            {props.children}

            <LengthIndicator
                max={props.max} //
                min={props.min}
                disableErrorMessages
                currentLength={props.currentLength}
            />
        </WrapperWithLengthIndicatorBase>
    )
}

export default WrapperWithWitdthIndicator
