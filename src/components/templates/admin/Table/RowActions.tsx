// Tools
import { Tooltip, styled } from "@mui/material"
// Types
import type { TableProps } from "./@types"
// Material UI Components
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Button from "@/components/templates/admin/Button"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
// Material UI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert"
// Styled components
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:not(&:last-child)": {
        marginBottom: "4px",
    },

    svg: {
        marginRight: "4px",
    },

    "&.red": {
        color: theme.palette.error.main,
    },
}))

interface RowActionsProps<T extends Record<string, string>> {
    actions: TableProps<T>["rowActions"]
    data: T
}

export default function RowActions<T extends Record<string, string>>(props: RowActionsProps<T>) {
    const { actions, data } = props

    if (actions === undefined) return <></>

    return (
        <PopupState
            variant="popover" //
            popupId="row-actions"
        >
            {(popupState) => (
                <>
                    <Button
                        {...bindTrigger(popupState)}
                        variant="transparent"
                        sx={{
                            width: "48px", //
                            height: "36px",
                            padding: "0",
                            minWidth: "0",
                        }}
                    >
                        <MoreVertIcon />
                    </Button>

                    <Menu {...bindMenu(popupState)}>
                        {actions.map((item, index) => {
                            const { redColor, action } = item

                            // Get dynamic values
                            const name: string = item.name instanceof Function ? item.name(data) : item.name
                            const icon: React.ReactNode = item.icon instanceof Function ? item.icon(data) : item.icon
                            const tooltip: string = item.tooltip instanceof Function ? item.tooltip(data) : item.tooltip

                            return (
                                <Tooltip title={tooltip} placement="left">
                                    <StyledMenuItem
                                        onClick={() => action(data)} //
                                        className={redColor ? "red" : ""}
                                        key={index}
                                    >
                                        {icon}
                                        {name}
                                    </StyledMenuItem>
                                </Tooltip>
                            )
                        })}
                    </Menu>
                </>
            )}
        </PopupState>
    )
}
