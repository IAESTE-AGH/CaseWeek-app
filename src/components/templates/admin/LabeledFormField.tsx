// Tools
import { styled } from "@mui/material"
// Types
import type { FunctionComponent } from "react"
// Components
import FormControlLabel from "@mui/material/FormControlLabel"

const LabeledFormFieldBase = styled(FormControlLabel)(({ theme }) => ({
    margin: 0,
    gap: "12px",
    width: "100%",
    "&>span": {
        width: "112px",
    },
    "&>div": {
        "&:not(&.extra-content)": {
            flexGrow: 1,
        },
    },
}))

interface LabeledFormFieldProps {
    label: string
    control: React.ReactElement
    extraContent?: React.ReactElement
}

const LabeledFormField: FunctionComponent<LabeledFormFieldProps> = (props) => {
    return (
        <LabeledFormFieldBase
            label={props.label} //
            labelPlacement="start"
            control={
                <>
                    {props.extraContent && <div className="extra-content">{props.extraContent}</div>}
                    {props.control}
                </>
            }
        />
    )
}

export default LabeledFormField
