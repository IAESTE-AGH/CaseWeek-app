// Tools
import { API } from "@/services"
import { useQuery } from "react-query"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
// Types
// -
// Components
import { Breadcrumbs } from "@/components/templates/admin"
import ExternalRedirection from "@/components/ExternalRedirection"
import { Grid, CircularProgress, Box, Divider, Paper, Stack } from "@mui/material"

export default function AdminCompanyPage() {
    const companyId = getURLQueryParamValue<string>("companyId")
    const { isLoading, data } = useQuery("company", () => API.companies.getById6(companyId!).then((res) => res.data))

    if (isLoading || !data) {
        return (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
                <Grid item xs={3}>
                    <CircularProgress />
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Breadcrumbs
                current={data.name} //
                crumbs={[{ name: "Firmy", path: "/admin/companies" }]}
            />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={2}>
                            <h2>Dane firmy</h2>
                            <Divider />
                            <Stack spacing={2} paddingBlock={2}>
                                <p>
                                    <strong>Nazwa firmy: </strong>
                                    {data.name}
                                </p>
                                <p>
                                    <strong>Strona internetowa: </strong>
                                    <ExternalRedirection to={data.websiteUrl} />
                                </p>
                                <p>
                                    <strong>Priorytet wyświetlania: </strong>
                                    {data.displayPriority ?? 0}
                                </p>
                                <p>
                                    <strong>Status: </strong>
                                    {data.published ? "Opublikowana" : "Nieopublikowana"}
                                </p>
                                <p>
                                    <strong>Skrócony opis: </strong>
                                    {data.shortDescription}
                                </p>
                                <p>
                                    <strong>Pełny opis: </strong>
                                    <br />
                                    <div style={{ paddingLeft: 15 }}>{data.longDescription}</div>
                                </p>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={2}>
                            <img src={data.logoUrl} alt={`Logo firmy ${data.name}`} style={{ maxWidth: "100%" }} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
