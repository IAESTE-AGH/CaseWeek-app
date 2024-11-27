// Tools
import { useState } from "react"
import { useDialog } from "@/contexts/Modals"
import { ToastContainer, toast } from "react-toastify"
import { getMockWorkshopById } from "@/mocks/workshops"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
// Types
import type { Workshop } from "@/@types/API"
import type { ExtendedWorkshopMemberStatus } from "@/data/workshopMemberStatuses"
// Components
import { Divider, Paper, Stack } from "@mui/material"
import * as WorkshopComponents from "@/components/workshop"
import InternalRedirection from "@/components/InternalRedirection"
import { Breadcrumbs, Button, CircularProgress } from "@/components/templates/admin"
import { AdmissionsPerGroup, AdmissionsWrapper, PageWrapper } from "@/components/pages/admin/workshops/singular"
// Icons
import ShareRoundedIcon from "@mui/icons-material/ShareRounded"
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded"

const WorkshopPage: React.FunctionComponent = () => {
    const displayConfirmationDialog = useDialog()
    // User id from URL
    const workshopId = getURLQueryParamValue<string>("workshopId")

    // Local state related to user data
    // TODO: Implement fetching from API and properly saving to local state
    const [data, setData] = useState<Workshop | null>(getMockWorkshopById(workshopId as string))

    // Fetch a workshop with given id
    // const { isLoading } = useMakeAPIRequest(...
    const isLoading: boolean = false

    // Loading spinner while fetching data
    if (isLoading || data === null) return <CircularProgress />

    // TODO: Some sort of magic to transform aggregated data from api containing numbers of attendences per status
    const aggregatedUsersCount: Record<ExtendedWorkshopMemberStatus, number> = {
        ALL: 20,
        CANDIDATE: 10,
        CONFIRMED: 3,
        QUALIFIED: 2,
        REJECTED: 1,
        RESERVE: 0,
        RESIGNED: 4,
    }

    // "Anuluj warsztat" button onClick handler
    async function handleWorkshopDeletion() {
        if (data === null) return

        // Show dialog to confirm deletion
        const userChoice: boolean = await displayConfirmationDialog({
            title: "Czy na pewno chcesz usunąć warsztat?",
            okText: "Tak, usuń",
            cancelText: "Nie, anuluj",
            message: `Czy na pewno chcesz usunąć warsztat "${data.title}"?`,
        })

        // If user cancels, do nothing
        if (!userChoice) return

        // TODO: Implement deletion of a workshop
        toast.info("🏗️ teraz powinien sie wyslac request kasujacy ten warsztat")
    }

    // "Opublikuj warsztat" / "Cofnij publikacje" button onClick handler
    async function handleWorkshopPublishToggle() {
        if (data === null) return

        // TODO: Implement toggling workshop status
        toast.info(`🏗️ teraz powinien sie wyslac request zmieniajacy status warsztatu na ${data.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED"}`)
    }

    return (
        <>
            <ToastContainer position="bottom-right" pauseOnHover={false} />

            <Breadcrumbs
                crumbs={[
                    {
                        name: "Warsztaty",
                        path: "/admin/workshops",
                    },
                ]}
                current={data.title}
            />

            <PageWrapper>
                <Paper className="settings">
                    <h2>Ustawienia</h2>
                    <Divider sx={{ mb: 3 }} />

                    <Stack
                        spacing={1}
                        sx={{
                            svg: {
                                fontSize: "28px !important",
                            },
                        }}
                    >
                        <Button
                            variant={data.status === "PUBLISHED" ? "contrast" : "success"} //
                            startIcon={<ShareRoundedIcon />}
                            onClick={handleWorkshopPublishToggle}
                        >
                            {data.status === "PUBLISHED" ? "Cofnij publikacje" : "Opublikuj warsztat"}
                        </Button>

                        <Button
                            variant="error" //
                            startIcon={<DeleteOutlineRoundedIcon />}
                            onClick={handleWorkshopDeletion}
                        >
                            Anuluj warsztat
                        </Button>

                        <InternalRedirection
                            label="Edytuj warsztat" //
                            componentVariant="secondary"
                            startAdornment={<EditNoteRoundedIcon />}
                            to={`/admin/workshop/update?workshopId=${data.id}`}
                        />
                    </Stack>
                </Paper>

                <Paper className="admissions">
                    <h2>Zgłoszenia na warsztat</h2>
                    <Divider sx={{ mb: 3 }} />

                    <AdmissionsWrapper>
                        {(Object.entries(aggregatedUsersCount) as [ExtendedWorkshopMemberStatus, number][]).map(([key, value], index) => {
                            return (
                                <AdmissionsPerGroup
                                    key={index} //
                                    workshopId={workshopId as string}
                                    limit={key === "QUALIFIED" ? data.capacity : undefined}
                                    group={key as ExtendedWorkshopMemberStatus}
                                    results={value}
                                />
                            )
                        })}
                    </AdmissionsWrapper>
                </Paper>

                <Paper className="creator">
                    <h2>Warsztat utworzony przez</h2>
                    <Divider sx={{ mb: 3 }} />
                    <strong>🏗️ tu sie jeszcze pracuje 🏗️</strong>
                </Paper>

                <Paper className="info">
                    <Stack direction="row" justifyContent="space-between">
                        <h2>Informacje o warsztacie</h2>
                        <InternalRedirection
                            to={`/warsztat?id=${data.id}`} //
                            label="Przejdź do warsztatu"
                            endAdornment={<KeyboardArrowRightRoundedIcon />}
                        />
                    </Stack>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={2}>
                        <span>
                            <strong>Nazwa warsztatu: </strong>
                            <span>{data.title}</span>
                        </span>

                        <span>
                            <strong>Status: </strong>
                            <WorkshopComponents.Status status={data.status} />
                        </span>

                        <span>
                            <strong>Data warsztatu: </strong>
                            <span>{new Date(data.startsAt).toLocaleString()}</span>
                        </span>

                        <span>
                            <strong>Miejsce warsztatu: </strong>
                            <span>{data.address}</span>
                        </span>

                        <span>
                            <strong>Czas trwania (min): </strong>
                            <span>{data.durationMinutes}</span>
                        </span>

                        <span>
                            <strong>Uczelnia: </strong>
                            <span>{data.university.name}</span>
                        </span>

                        <span>
                            <strong>Nazwa firmy: </strong>
                            <span>{data.company.name}</span>
                        </span>

                        <span>
                            <strong>Optymalna liczba uczestników: </strong>
                            <span>{data.capacity}</span>
                        </span>

                        <span>
                            <strong>Kierunki studiów: </strong>
                            {data.allFieldsOfStudyAccepted ? (
                                "wszystkie są akceptowalne"
                            ) : (
                                <ul>
                                    {data.preferableFieldsOfStudy.map((item, index) => {
                                        return <li key={index}>{item.name}</li>
                                    })}
                                </ul>
                            )}
                        </span>

                        <span>
                            <strong>Minimalny rok studiów: </strong>
                            <span>{data.minYearOfStudy}</span>
                        </span>

                        <span>
                            <strong>Maksymalny rok studiów: </strong>
                            <span>{data.maxYearOfStudy}</span>
                        </span>

                        <span>
                            <strong>Skrócony opis warsztatu: </strong>
                            <br />
                            <span>{data.shortDescription}</span>
                        </span>

                        <span>
                            <strong>Pełen opis warsztatu: </strong>
                            <br />
                            <span>{data.longDescription}</span>
                        </span>

                        <span>
                            <strong>Treść widomości email: </strong>
                            <br />
                            <span>{data.emailTextCandidate}</span>
                        </span>

                        <span>
                            <strong>
                                Treść widomości email- <span style={{ color: "#166DBA" }}>kandydat</span>
                            </strong>
                            <br />
                            <span>{data.emailTextCandidate}</span>
                        </span>

                        <span>
                            <strong>
                                Treść widomości email- <span style={{ color: "#166DBA" }}>osoba zaakwalfikowana</span>
                            </strong>
                            <br />
                            <span>{data.emailTextQualified}</span>
                        </span>
                    </Stack>
                </Paper>
            </PageWrapper>
        </>
    )
}

export default WorkshopPage
