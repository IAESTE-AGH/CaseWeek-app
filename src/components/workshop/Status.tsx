// Tools
import { styled } from "@mui/material"
import { getWorkshopStatusAlias, getWorkshopStatusColor } from "@/data/workshopStatuses"
// Types
import type { WorkshopStatus as T_WorkshopStatus } from "@/data/workshopStatuses"

interface WorkshopStatusProps {
    status: T_WorkshopStatus
}

const WorkshopStatusBase = styled("span")(({ theme }) => ({
    padding: "4px 8px",
    color: "#fff",
    borderRadius: "4px",
}))

const WorkshopStatus: React.FunctionComponent<WorkshopStatusProps> = (props) => {
    const backgroundColor: string = getWorkshopStatusColor(props.status)
    const status: string = getWorkshopStatusAlias(props.status)

    return (
        <WorkshopStatusBase sx={{ backgroundColor }}>
            {status}
            {/*  */}
        </WorkshopStatusBase>
    )
}

export default WorkshopStatus
