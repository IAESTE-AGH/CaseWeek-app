// Types
import type { Partner } from "@/@types/API"

interface PartnerLogoProps {
    partner: Partner
    height: string
}

const PartnerLogo: React.FunctionComponent<PartnerLogoProps> = ({ partner, height }) => {
    return (
        <img
            src={partner.logoUrl} //
            alt={partner.name}
            style={{ height }}
        />
    )
}

export default PartnerLogo
