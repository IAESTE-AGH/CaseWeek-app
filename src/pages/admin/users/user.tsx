// Tools
import { USER_ROLES } from "@/data/userRoles"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
import { useMutation, useQuery } from "react-query"
import { $axios, API } from "@/services"
import { useState } from "react"
import { addSpacesToPhoneNumber } from "@/utils/addSpacesToPhoneNumber"
import { ToastContainer, toast } from "react-toastify"
// Types
import type { UserRole } from "@/data/userRoles"

// Components
import { Box, Divider, Grid, Paper, Stack } from "@mui/material"
import { Breadcrumbs, Button, CircularProgress, Select } from "@/components/templates/admin"

// MUI Icons
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import { renderLanguageSkillLevel } from "@/utils/renderLanguageSkillLevel"
import { UserItem } from "@/api"
import UserRoleBadge from "@/components/templates/admin/UserRoleBadge"

const SingleUser: React.FunctionComponent = (props) => {
    // User id from URL
    const userId = getURLQueryParamValue<string>("userId")

    // Local state related to user data
    const [data, setData] = useState<UserItem | null>(null)

    // New role selected by admin
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

    // Fetch user data
    const { isLoading } = useQuery(
        "user", //
        () =>
            API.users.getById1(userId!).then((res) => {
                setSelectedRole(res.data.role)
                setData(res.data)
            })
    )

    // Update user role
    const { mutate: changeRole } = useMutation("change-role", {
        mutationFn: () => {
            return $axios.patch(`/users/${userId}/role`, { role: selectedRole })
        },
        onSuccess: () => {
            toast.success("Rola zmieniona pomyślnie")
            setData((prev) => ({ ...prev!, role: selectedRole! }))
        },
        onError: () => {
            toast.error("Nie udało się zmienić roli użytkownika")
        },
    })

    // Loading spinner while fetching data
    if (isLoading || data === null) return <CircularProgress />

    // Render an actual component
    return (
        <>
            <ToastContainer position="bottom-right" pauseOnHover={false} />

            <Breadcrumbs
                current={`${data.firstName} ${data.lastName}`} //
                crumbs={[{ name: "Użytkownicy", path: "/admin/users" }]}
            />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={2}>
                            <h2>Dane użytkownika</h2>
                            <Divider />
                            <Stack spacing={2} paddingBlock={2}>
                                <p>
                                    <strong>Imię i nazwisko:</strong> {data.firstName} {data.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a>
                                </p>
                                <p>
                                    <strong>Telefon:</strong> <a href={`tel:${data.phoneNumber}`}>{addSpacesToPhoneNumber(data.phoneNumber)}</a>
                                </p>
                                <p>
                                    <strong>Uczelnia:</strong> {data.university.name}
                                </p>
                                <p>
                                    <strong>Kierunek:</strong> {data.fieldOfStudy.name}
                                </p>
                                <p>
                                    <strong>Rok studiów:</strong> Rok {data.yearOfStudy}
                                </p>
                                <p>
                                    <strong>Płeć:</strong> {data.sex === "Male" ? "Mężczyzna" : "Kobieta"}
                                </p>
                                <div>
                                    <strong>Języki:</strong>
                                    <ul>
                                        {data.languageSkills.map((language) => {
                                            return (
                                                <li>
                                                    {language.language.name} - {renderLanguageSkillLevel(language.skillLevel)}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={2}>
                            <h2>Rola</h2>
                            <Divider />
                            {(() => {
                                if (data.role === "ADMIN") {
                                    return (
                                        <>
                                            <h3>System ADMIN</h3>
                                        </>
                                    )
                                } else if (selectedRole !== null)
                                    return (
                                        <>
                                            <Stack spacing={1} direction="row" paddingBlock={2}>
                                                <Select
                                                    value={selectedRole} //
                                                    options={USER_ROLES}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                    startAdornment={<GroupRoundedIcon />}
                                                    sx={{
                                                        width: "280px",
                                                    }}
                                                ></Select>
                                                <Button disabled={selectedRole === data.role} onClick={() => changeRole()}>
                                                    Zmień
                                                </Button>
                                            </Stack>

                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <p>
                                                    <strong>Obecnie: </strong>
                                                    <span>{USER_ROLES.find(({ value }) => value === data.role)?.alias}</span>
                                                </p>
                                                <UserRoleBadge role={data.role} />
                                            </Stack>
                                        </>
                                    )
                            })()}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default SingleUser
