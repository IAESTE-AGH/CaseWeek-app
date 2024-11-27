import { Box } from "@mui/material"
import { BaseSection } from "./baseSection"
import tie_icon from "@/assets/icons/tie_icon.svg"
import hat_icon from "@/assets/icons/hat_icon.svg"
import book_icon from "@/assets/icons/book_icon.svg"
import people_add_icon from "@/assets/icons/people_add_icon.svg"
import atom_icon from "@/assets/icons/atom_icon.svg"
import people_icon from "@/assets/icons/people_icon.svg"
import { Button } from "@/components/button"
import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth"
import { useNavigate } from "react-router"

const TILES = [
    { icon: tie_icon, title: "Kontakt z pracodawcą", description: "Najlepsze firmy z polskiego i światowego rynku pracy w jednym miejscu." },
    { icon: hat_icon, title: "Praktyczna Wiedza", description: "Zastosowanie zdobytej wiedzy w rozwiązywaniu problemów." },
    { icon: book_icon, title: "Staże i Praktyki", description: "Możliwości rozwoju oferowane przez wiodące marki." },
    { icon: people_add_icon, title: "Umiejętności miękkie", description: "Rozwój osobisty pod okiem najlepszych specjalistów z branży." },
    { icon: atom_icon, title: "Innowacje", description: "Nowoczesne rozwiązania oraz najlepsze technologie." },
    { icon: people_icon, title: "Praca zespołowa", description: "Wspólne rozwiązywanie casów i wypracowywanie nowych rozwiązań." },
]

export function CaseWeekPros() {
    // const userState = useContext(AuthContext)
    // const navigate = useNavigate()
    // const handleClick = () => {
    //     if (userState.status === "authenticated") {
    //         navigate("/user/warsztaty")
    //     } else {
    //         navigate("/register")
    //     }
    // }

    return (
        <BaseSection background="#262626">
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={6} color={"#fff"} lineHeight={1.5}>
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        fontFamily: "League Spartan, sans-serif",
                        gridColumn: "span 3",
                        letterSpacing: "0.27em",
                        margin: 0,
                    }}
                >
                    Co zyskujesz dzięki IAESTE CaseWeek?
                </h1>

                {TILES.map((tile, index) => {
                    return (
                        <Box key={index} sx={{ gridRow: "span 3", display: "grid", gridTemplateRows: "subgrid" }} gap={2}>
                            <img src={tile.icon} alt="Tie icon" height={"auto"} style={{ justifySelf: "center" }} />
                            <h3
                                style={{
                                    textAlign: "center",
                                    margin: 0,
                                    fontFamily: "League Spartan, sans-serif",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.27em",
                                    fontWeight: "bold",
                                }}
                            >
                                {tile.title}
                            </h3>
                            <p
                                style={{
                                    textAlign: "center",
                                    letterSpacing: "0.27em",
                                    margin: 0,
                                    textWrap: "balance",
                                }}
                            >
                                {tile.description}
                            </p>
                        </Box>
                    )
                })}

                <Box gridColumn={"span 3"} display={"grid"} gridTemplateColumns={"subgrid"} p={6}>
                    {/* ↓ This box is used for spacing in the grid */}
                    <Box></Box>
                    <Button title={"Zarejestruj się na warsztat"} />
                </Box>
            </Box>
        </BaseSection>
    )
}
