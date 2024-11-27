// Tools
import { Partner } from "@/@types/API"
import { styled } from "@mui/material"

interface PartnerStatusProps {
    isPublished: Partner["published"]
}

const PartnerStatusBase = styled("span")(({ theme }) => ({
    padding: "4px 8px",
    color: "#fff",
    borderRadius: "4px",
}))

const PartnerStatus: React.FunctionComponent<PartnerStatusProps> = ({ isPublished }) => {
    const backgroundColor: string = isPublished ? "#4CAF50" : "#2196F3"
    const status: string = isPublished ? "OPUBLIKOWANY" : "NIEOPUBLIKOWANY"

    return (
        <PartnerStatusBase sx={{ backgroundColor }}>
            {status}
            {/*  */}
        </PartnerStatusBase>
    )
}

export default PartnerStatus
