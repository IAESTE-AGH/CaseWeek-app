// Tools
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/hooks/useAuthContext"
// Types
import type { User } from "@/@types/API"
import type { FunctionComponent } from "react"
// Components
import Stack from "@mui/material/Stack"
import { Divider, Grid, Paper } from "@mui/material"
import { Breadcrumbs } from "@/components/templates/admin"
import Column from "@/components/pages/admin/landing/Column"
import InternalRedirection from "@/components/InternalRedirection"
import UserRoleBadge from "@/components/templates/admin/UserRoleBadge"
import CircularLoader from "@/components/templates/admin/CircularLoader"
import NavigationRoute from "@/components/pages/admin/landing/NavigationRoute"
// Icons
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import CasesRoundedIcon from "@mui/icons-material/CasesRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded"
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService"

function getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`
}

const AdminMainPage: FunctionComponent = () => {
    const navigate = useNavigate()
    const { currentUser, status } = useAuthContext()

    switch (status) {
        case "loading":
            return <CircularLoader />

        case "authenticated":
            return (
                <>
                    <Breadcrumbs
                        opositeSide={
                            <InternalRedirection
                                to="#" //
                                label="Ustawienia"
                                startAdornment={<SettingsRoundedIcon />}
                            />
                        } //
                    />
                    <Paper sx={{ border: "0px solid red", p: 1, my: 1 }}>
                        <h1>Witaj, {getFullName(currentUser)}</h1>

                        <Stack flexDirection="row" gap={1}>
                            <span>Zalogowano z uprawnieniami: </span>
                            <UserRoleBadge role={currentUser.role} full />
                        </Stack>

                        <Divider sx={{ mb: 4, mt: 2 }} />

                        <Grid container columnSpacing={10}>
                            <Column header="Warsztaty">
                                <>
                                    <NavigationRoute
                                        url="/admin/workshops" //
                                        label="Warsztaty"
                                        avatar={<HomeRepairServiceIcon />}
                                        numberOfResults={3}
                                    />

                                    <Divider />

                                    <NavigationRoute
                                        url="/admin/workshops" //
                                        label="Warsztaty (archiwum)"
                                        avatar={<HomeRepairServiceIcon />}
                                        numberOfResults={3}
                                        archive
                                    />
                                </>
                            </Column>

                            <Column header="Użytkownicy i firmy">
                                <>
                                    <NavigationRoute
                                        url="/admin/users" //
                                        label="Użytkownicy"
                                        avatar={<GroupRoundedIcon />}
                                        numberOfResults={3}
                                    />

                                    <Divider />

                                    <NavigationRoute
                                        url="/admin/companies" //
                                        label="Firmy"
                                        avatar={<ApartmentRoundedIcon />}
                                        numberOfResults={3}
                                    />

                                    <Divider />

                                    <NavigationRoute
                                        url="/admin/partners" //
                                        label="Partnerzy"
                                        avatar={<CasesRoundedIcon />}
                                        numberOfResults={3}
                                    />
                                </>
                            </Column>
                        </Grid>
                    </Paper>
                </>
            )

        case "unauthenticated":
            navigate("/login")
            return <></>
    }
}

export default AdminMainPage
