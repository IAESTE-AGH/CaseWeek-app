import { Base } from "./Base"
import { IconBase } from "./IconBase"

// icons
import facebook_icon from "@/assets/icons/facebook_icon.svg"
import instagram_icon from "@/assets/icons/instagram_icon.svg"
import linkedin_icon from "@/assets/icons/linkedin_icon.svg"
import youtube_icon from "@/assets/icons/youtube_icon.svg"
import logo_circle from "@/assets/img/logo_circle.png"

const ICON_STYLE: React.CSSProperties = {
    width: "1.5em",
    height: "1.5em",
}

const LOGO_STYLE: React.CSSProperties = {
    width: "4.5em",
    height: "4.5em",
}

export default function Footer() {
    return (
        <Base id="footer">
            <IconBase href="https://www.facebook.com/IaestePoland/" target="_blank">
                <img src={facebook_icon} alt="facebook_icon" style={ICON_STYLE} />
            </IconBase>
            <IconBase href="https://www.youtube.com/channel/UC4TzR5wg4WlwnupQMztroUQ" target="_blank">
                <img src={youtube_icon} alt="youtube_icon" style={ICON_STYLE} />
            </IconBase>

            <img src={logo_circle} alt="IAESTE logo" style={LOGO_STYLE} />

            <IconBase href="https://www.instagram.com/iaeste_poland/" target="_blank">
                <img src={instagram_icon} alt="instagram_icon" style={ICON_STYLE} />
            </IconBase>
            <IconBase href="https://www.linkedin.com/company/iaeste-poland/" target="_blank">
                <img src={linkedin_icon} alt="linkedin_icon" style={ICON_STYLE} />
            </IconBase>
        </Base>
    )
}
