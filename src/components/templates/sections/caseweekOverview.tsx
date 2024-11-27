import { Box, Stack } from "@mui/material"
import { BaseSection } from "./baseSection"
import icw_logotype from "@/assets/img/icw_logotype.svg"
import overview_1 from "@/assets/img/overview_1.png"
import overview_2 from "@/assets/img/overview_2.png"
import cogwheel_light_icon from "@/assets/icons/cogwheel_light_icon.svg"
import AnimatedNumbers from "react-animated-numbers"
import React from "react"

const AN_STYLE: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#5A4C32",
    width: "1.2ch",
}

// Statistics on the main page, that are animated
const STATISTICS = {
    workshops: 160,
    universities: 10,
    companies: 60,
    cities: 9,
}

export function CaseWeekOverview() {
    return (
        <BaseSection background="linear-gradient(#DAB88B 15%, #fffffe 25%)">
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 4,
                    zIndex: 2,
                    position: "relative",
                    color: "#2c2c2c",
                    lineHeight: 2,
                }}
            >
                <img src={icw_logotype} alt="IAESTE CASEWEEK logotype" width={"100%"} />

                <p style={{ fontSize: "1.25rem" }}>
                    Największy cykl warsztatów inżynierskich w Polsce. Założeniem projektu jest zbliżenie do siebie środowiska akademickiego i biznesowego. Praktyczna forma case study umożliwia
                    studentom zapoznanie się z realnymi problemami występującymi w codziennej pracy oraz doskonalenie swoich umiejętności zarówno zawodowych jak i miękkich.
                </p>

                <img src={overview_1} width={"100%"} style={{ gridRow: "span 2" }} />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <AnimatedNumbers animateToNumber={STATISTICS.workshops} fontStyle={AN_STYLE} />
                    <span style={{ fontSize: "1.5rem" }}>Warsztatów</span>
                </Box>

                <img src={overview_2} width={"100%"} style={{ gridRow: "span 2" }} />

                <Box gridRow={"span 2"}>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.universities} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>Uczelni</span>
                    </Box>
                    <p style={{ fontSize: "1.25rem" }}>
                        Projekt umożliwia studentom i pracodawcy wspólną pracę nad przygotowanymi zagadnieniami. Podczas cyklu warsztatów wiodące marki z rynku polskiego i światowego przeprowadzają
                        warsztaty na najlepszych uczelniach technicznych w kraju. Studenci stają przed możliwością zmierzenia się z realnymi problemami spotykanymi na co dzień w pracy zawodowej.
                        Pracodawcy podczas casów mają okazję poznać zachowania studentów w atmosferze pracy, wyłonić talenty i nawiązać współpracę z potencjalnymi kandydatami. Dzięki udziale w
                        projekcie IAESTE CaseWeek tysiące polskich studentów zdobyło wymarzoną pracę.
                    </p>
                </Box>

                <Stack direction={"row"} justifyContent={"center"} gap={6}>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.companies} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>Firm</span>
                    </Box>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.cities} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>Miast</span>
                    </Box>
                </Stack>
            </Box>

            <img src={cogwheel_light_icon} style={{ position: "absolute", bottom: 0, left: 0, transform: "translate(-30%, 50%)", zIndex: 0 }} />
        </BaseSection>
    )
}
