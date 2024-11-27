// Tools
import { styled } from "@mui/material"
import { getColorForPartnerType, getPartnerTypeInPolish } from "@/data/partners/variants"
// Types
import { PartnerType as T_PartnerType } from "@/@types/API"

const PartnerTypeBase = styled("span")(({ theme }) => ({
    padding: "4px 8px",
    color: "#fff",
    borderRadius: "4px",
}))

interface PartnerTypeProps {
    type: T_PartnerType
}

const PartnerType: React.FunctionComponent<PartnerTypeProps> = ({ type }) => {
    const backgroundColor: string = getColorForPartnerType(type)
    const content: string = getPartnerTypeInPolish(type)

    return (
        <PartnerTypeBase sx={{ backgroundColor }}>
            {content}
            {/*  */}
        </PartnerTypeBase>
    )
}

export default PartnerType
