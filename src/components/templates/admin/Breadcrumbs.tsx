// Tools
import { NavLink } from "react-router-dom"
import { alpha, styled } from "@mui/material"
// Types
import type { SxProps } from "@mui/material"
// Material UI Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
// Styled components
const BreadcrumbsWrapper = styled("header")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    border: "1px solid #000",
    padding: "16px 24px",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginBottom: "24px",

    svg: {
        fontSize: "28px",
        marginRight: "12px",
    },

    "& > div.breadcrums-section": {
        display: "flex",
        gap: "4px",
        alignItems: "center",

        ".crumbs": {
            fontWeight: 500,
            padding: "12px 16px",
            borderRadius: "5px",
            boxSizing: "border-box",
        },

        ".crumbs.current": {
            background: "#000",
            color: "#fff",
            cursor: "default",
        },

        "a.crumbs": {
            marginRight: "36px",
            position: "relative",
            textDecoration: "none",
            color: "#000",
            display: "flex",
            alignItems: "center",
            transition: "background 0.2s ease-in-out",

            "&:not(&.current)": {
                "&::after": {
                    content: "''",
                    position: "absolute",
                    right: "-22px",
                    height: "22px",
                    top: "50%",
                    transform: "translateY(-50%) rotate(22deg)",
                    width: "2px",
                    opacity: 1,
                    background: "black",
                },

                "&:hover": {
                    background: alpha("#000", 0.1),
                },
            },
        },
    },
}))

interface BreadcrumbsProps {
    crumbs?: {
        name: string
        path: string
    }[]
    current?: string
    opositeSide?: React.ReactNode
    sx?: SxProps
}

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = (props) => {
    return (
        <BreadcrumbsWrapper sx={props.sx}>
            <div className="breadcrums-section">
                <NavLink className={`crumbs ${!props.current && "current"}`} to="/admin">
                    <HomeRoundedIcon />
                    Panel Administratora
                </NavLink>

                {props.crumbs &&
                    props.crumbs.map((item, index) => {
                        return (
                            <NavLink
                                to={item.path} //
                                key={index}
                                className="crumbs"
                            >
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    })}

                {props.current && <span className="crumbs current">{props.current}</span>}
            </div>

            {props.opositeSide && <div className="breadcrums-section">{props.opositeSide}</div>}
        </BreadcrumbsWrapper>
    )
}

export default Breadcrumbs
