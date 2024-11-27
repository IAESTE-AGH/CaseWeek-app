import { useEffect, useState } from "react"
import { BaseSection } from "./baseSection"
import Background from "@/assets/img/welcome_bg.png"
import { Box } from "@mui/material"

export function WelcomeSection() {
    const [sectionHeight, setSectionHeight] = useState<number>(1080)

    useEffect(() => {
        const navbarHeight = document.getElementById("navbar")?.clientHeight
        const sectionHeight = window.innerHeight - (navbarHeight || 0)
        setSectionHeight(sectionHeight)
    }, [])

    return (
        <BaseSection height={sectionHeight} backgroundImage={Background} noPadding>
            <Box
                sx={{
                    background: "linear-gradient(0deg, rgb(38, 38, 38, 0.9) 5%, rgba(0, 0, 0, 0) 80%)",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "64px 64px",
                    boxSizing: "border-box",
                }}
            >
                <h1
                    style={{
                        color: "#DAB88B",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        letterSpacing: "0.27em",
                        marginBottom: "16px",
                        fontFamily: "League Spartan, sans-serif",
                    }}
                >
                    Industry Meets Academic
                </h1>
                <h3
                    style={{
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "0.27em",
                        fontFamily: "League Spartan, sans-serif",
                    }}
                >
                    Największy cykl warsztatów inynierskich w Polsce
                </h3>
            </Box>
        </BaseSection>
    )
}
