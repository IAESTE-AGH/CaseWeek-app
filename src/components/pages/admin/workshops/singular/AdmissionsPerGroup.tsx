// Tools
import { Typography, styled } from "@mui/material"
import { getWorkshopMemberColor, getWorkshopMemberStatusAlias } from "@/data/workshopMemberStatuses"
// Types
import type { FunctionComponent } from "react"
import type { ExtendedWorkshopMemberStatus } from "@/data/workshopMemberStatuses"
// Components
import { NavLink } from "react-router-dom"
// Icons
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"

const AdmissionsPerGroupBase = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    ".number-of-results-wrapper": {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        svg: {
            fontSize: "36px",
        },
        ".number-of-results": {
            fontSize: "20px",
            fontWeight: "500",
        },
    },
}))

interface AdmissionsPerGroupProps {
    /** Workshop's capacity */
    limit?: number
    /** The number of users in given group */
    results: number

    workshopId: string // we need to pass workshop in order to properly redirect user on click
    group: ExtendedWorkshopMemberStatus
}

const AdmissionsPerGroup: FunctionComponent<AdmissionsPerGroupProps> = (props) => {
    const color = getWorkshopMemberColor(props.group)
    const alias = getWorkshopMemberStatusAlias(props.group)

    return (
        <NavLink to={`/admin/workshop-applications?workshopId=${props.workshopId}&status=${props.group}`}>
            <AdmissionsPerGroupBase sx={{ color }}>
                <span className="number-of-results-wrapper">
                    <GroupsRoundedIcon />
                    <span className="number-of-results">
                        <span>{props.results}</span>
                        {props.limit && <span>{` / ${props.limit}`}</span>}
                    </span>
                </span>
                <Typography sx={{ color }}>{alias}</Typography>
            </AdmissionsPerGroupBase>
        </NavLink>
    )
}

export default AdmissionsPerGroup
