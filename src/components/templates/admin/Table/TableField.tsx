import { NavLink } from "react-router-dom"
import { styled } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded"

import type { CustomizedColumn } from "./@types"
import Tooltip from "@mui/material/Tooltip"
import { copyToClipboard } from "@/utils/copyToClipboard"

const FieldContentDirectWrapper = styled("div")(({ theme }) => ({
    "&.center": {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}))

interface TableRowProps<T extends Record<string, any>> extends Omit<CustomizedColumn<T>, "key" | "alias"> {
    data: T
    field: keyof T
}

interface CellWrapperProps<T extends Record<string, any>> extends Pick<TableRowProps<T>, "redirectToOnClick" | "data"> {
    children: React.ReactNode
}

/* This component is a wrapper for the TableCell component. It's purpose is to provide a way to **OPTIONALLY** redirect to a different page when the cell is clicked. */
function CellWrapper<T extends Record<string, any>>(props: CellWrapperProps<T>): JSX.Element {
    if (props.redirectToOnClick) {
        return (
            <Tooltip title="Zobacz szczegóły" placement="top-start">
                <NavLink to={props.redirectToOnClick(props.data)}>{props.children}</NavLink>
            </Tooltip>
        )
    }
    return <>{props.children}</>
}

export default function TableField<T extends Record<string, any>>(props: TableRowProps<T>): JSX.Element {
    const { data, field, render } = props

    const valueOnThisField: string = typeof data[field] === "object" ? JSON.stringify(data[field]) : data[field]

    return (
        <td>
            <CellWrapper {...props}>
                <FieldContentDirectWrapper className={props.center ? "center" : undefined}>
                    {typeof render === "function" ? render(data) : valueOnThisField}

                    {props.copyToClipboard && (
                        <Tooltip
                            title="Kopiuj do schowka" //
                            placement="top"
                        >
                            <IconButton onClick={() => copyToClipboard(valueOnThisField)}>
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </FieldContentDirectWrapper>
            </CellWrapper>
        </td>
    )
}
