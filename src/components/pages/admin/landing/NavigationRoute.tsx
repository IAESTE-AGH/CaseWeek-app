// Tools
import { useRef } from "react"
// Types
import type { FunctionComponent } from "react"
// Components
import { Avatar, Divider, styled } from "@mui/material"
import InternalRedirection from "@/components/InternalRedirection"

interface NavigationRouteProps {
    /** Url path which specify where user should be redirected*/
    url: string
    label: string
    avatar: React.ReactElement
    numberOfResults: number
    /** Enables archive visual style */
    archive?: boolean
}

const NavigationRouteBase = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    boxSizing: "border-box",
    borderRadius: "3px",
    width: "100%",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
        background: "rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
    },

    ".MuiAvatar-root": {
        width: "48px",
        height: "auto",
        aspectRatio: "1",
        marginRight: "18px",
        background: "#000",
        color: "#fff",
    },
    "span.label": {
        flexGrow: 1,
    },

    "strong.number-of-results": {
        width: "112px", // this width is enough for 4 digits long values
        textAlign: "center",
    },

    ".MuiDivider-root": {
        margin: "0 24px",
    },

    "&.archive": {
        ".MuiAvatar-root": {
            background: "#000",
            opacity: 0.5,
            color: "#fff",
        },
    },
}))

const NavigationRoute: FunctionComponent<NavigationRouteProps> = (props) => {
    const internalRedirectionRef = useRef<HTMLButtonElement | null>(null)

    function onClick() {
        internalRedirectionRef.current?.click()
    }

    return (
        <NavigationRouteBase
            role="button" //
            onClick={onClick}
            className={props.archive ? "archive" : ""}
        >
            <Avatar>{props.avatar}</Avatar>

            <span className="label">{props.label}</span>

            <Divider orientation="vertical" flexItem />

            <strong className="number-of-results">{props.numberOfResults} wyników</strong>

            <Divider orientation="vertical" flexItem />

            <InternalRedirection
                to={props.url} //
                ref={internalRedirectionRef}
                label={"Przejdź"}
                componentVariant="contrast"
            />
        </NavigationRouteBase>
    )
}

export default NavigationRoute
