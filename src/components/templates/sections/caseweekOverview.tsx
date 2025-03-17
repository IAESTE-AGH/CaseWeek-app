import React from "react";
import { Box, Stack } from "@mui/material";
import { BaseSection } from "./baseSection"; 
import icw_logotype from "@/assets/img/icw_logotype.svg";
import overview_1 from "@/assets/img/overview_1.png";
import overview_2 from "@/assets/img/overview_2.png";
import cogwheel_light_icon from "@/assets/icons/cogwheel_light_icon.svg";
import AnimatedNumbers from "react-animated-numbers";
import { t } from "@/i18n/i18n";

const AN_STYLE: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#5A4C32",
    width: "1.2ch",
};

const STATISTICS = {
    workshops: 160,
    universities: 10,
    companies: 60,
    cities: 9,
};

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
                    {t("homepage.introText1")} {/* "test1" */}
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
                    <span style={{ fontSize: "1.5rem" }}>{t("homepage.workshopsCounterLabel")}</span> 
                </Box>

                <img src={overview_2} width={"100%"} style={{ gridRow: "span 2" }} />

                <Box gridRow={"span 2"}>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.universities} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>{t("homepage.universitiesCounterLabel")}</span>
                    </Box>
                    <p style={{ fontSize: "1.25rem" }}>
                        {t("homepage.introText2")} 
                    </p>
                </Box>

                <Stack direction={"row"} justifyContent={"center"} gap={6}>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.companies} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>{t("homepage.companiesCounterLabel")}</span> 
                    </Box>
                    <Box display="flex" justifyContent={"center"} alignItems={"center"} gap={3}>
                        <AnimatedNumbers animateToNumber={STATISTICS.cities} fontStyle={AN_STYLE} />
                        <span style={{ fontSize: "1.5rem" }}>{t("homepage.citiesCounterLabel")}</span> 
                    </Box>
                </Stack>
            </Box>

            <img
                src={cogwheel_light_icon}
                style={{ position: "absolute", bottom: 0, left: 0, transform: "translate(-30%, 50%)", zIndex: 0 }}
                alt="cogwheel"
            />
        </BaseSection>
    );
}