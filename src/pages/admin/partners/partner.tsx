// Tools
import { useState } from "react"
import { API } from "@/services/api"
import { useQuery } from "react-query"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
// Types
import type { PartnerItem } from "@/api"
// Components
import * as PartnerComponents from "@/components/partner"
import { Breadcrumbs, CircularProgress } from "@/components/templates/admin"
import ExternalRedirection from "@/components/ExternalRedirection"
import InternalRedirection from "@/components/InternalRedirection"
import { Box, Divider, Grid, Paper, Stack } from "@mui/material"
// Icons
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"

const PartnerPage: React.FunctionComponent = () => {
    const partnerId = getURLQueryParamValue<string>("partnerId")

    // Local state related to user data
    const [data, setData] = useState<PartnerItem | null>(null)

    // Fetch user data
    const { isLoading } = useQuery(
        "user", //
        () =>
            API.partners.getById3(partnerId!).then((res) => {
                setData(res.data)
            })
    )

    // Loading spinner while fetching data
    if (isLoading || data === null) return <CircularProgress />

    return (
        <>
            <Breadcrumbs
                current={`${data.name}`} //
                crumbs={[{ name: "Partnerzy", path: "/admin/partners" }]}
                opositeSide={
                    <InternalRedirection
                        label="Edytuj partnera" //
                        to={`/admin/partner/update?partnerId=${partnerId}`}
                        startAdornment={<EditNoteRoundedIcon />}
                    />
                }
            />

            <Grid item xs={6}>
                <Paper>
                    <Box p={2}>
                        <h1 style={{ marginTop: 0 }}>{data.name}</h1>
                        <Grid container spacing={8}>
                            <Grid item xs={7}>
                                <Stack spacing={2} paddingBlock={2}>
                                    <h2>Dane partnera</h2>

                                    <Divider />

                                    <p>
                                        <strong>Nazwa partnera: </strong> {data.name}
                                    </p>
                                    <p>
                                        <strong>{"Strona internetowa: "}</strong>
                                        <ExternalRedirection to={data.websiteUrl} />
                                    </p>
                                    <p>
                                        <strong>Krótki opis: </strong> {data.shortDescription}
                                    </p>
                                    <p>
                                        <strong>Długi opis: </strong> {data.longDescription}
                                    </p>

                                    <br />
                                    <h2>Ustawienia</h2>

                                    <p>
                                        <strong>Typ: </strong>
                                        <PartnerComponents.Type type={data.partnerType} />
                                    </p>

                                    <p>
                                        <strong>Priorytet wyświetlania: </strong>
                                        {data.displayPriority}
                                    </p>

                                    <p>
                                        <strong>Widoczność: </strong>
                                        <PartnerComponents.Status isPublished={data.published} />
                                    </p>
                                </Stack>
                            </Grid>

                            <Grid
                                item
                                xs={5}
                                sx={{
                                    justifyContent: "flex-end", //
                                    display: "flex",
                                    my: 6,
                                    img: {
                                        width: "100%",
                                        objectFit: "contain",
                                        objectPosition: "top",
                                    },
                                }}
                            >
                                <PartnerComponents.Logo partner={data} height="auto" />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default PartnerPage
