import { LoginForm } from "@/components/login"
import { BaseSection } from "@/components/templates/sections/baseSection"
import { useState, useEffect, useContext, useLayoutEffect } from "react"
import cogwheel_light_icon from "@/assets/icons/cogwheel_light_icon.svg"
import { Box } from "@mui/material"
import { Link } from "@/components/link"
import { AuthContext } from "@/contexts/Auth"
import { Navigate, useNavigate } from "react-router"

function LoginPage() {
    const { status } = useContext(AuthContext)
    const navigate = useNavigate()
    const [sectionHeight, setSectionHeight] = useState<number>(900)

    useLayoutEffect(() => {
        const navbarHeight = document.getElementById("navbar")?.clientHeight
        const footerHeight = document.getElementById("footer")?.clientHeight
        const sectionHeight = window.innerHeight - (navbarHeight || 0) - (footerHeight || 0)
        setSectionHeight(sectionHeight)
    }, [])

    useLayoutEffect(() => {
        if (status === "authenticated") {
            navigate(-1)
        }
    }, [])

    return (
        <BaseSection background="#fffffe" minHeight={sectionHeight}>
            <Box sx={{ maxWidth: "60ch !important", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
                <h1>Zaloguj się do systemu IAESTE CaseWeek</h1>
                <LoginForm />
                <span style={{ alignSelf: "center", marginTop: "2rem" }}>
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                </span>
            </Box>

            <img src={cogwheel_light_icon} style={{ position: "absolute", bottom: 0, left: 0, transform: "translate(-50%, 50%)", zIndex: 0, width: "500px" }} />
            <img src={cogwheel_light_icon} style={{ position: "absolute", top: 0, right: 0, transform: "translate(50%, -50%)", zIndex: 0, width: "500px" }} />
        </BaseSection>
    )
}

export default function LoginPageWrapper() {
    return (
        <AuthContext.Consumer>
            {({ status }) => {
                if (status === "authenticated") {
                    return <Navigate to="/" />
                } else {
                    return <LoginPage />
                }
            }}
        </AuthContext.Consumer>
    )
}
