// Tools
import { useState } from "react"
import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { useDebounce, useDisableUntilChange, useURLQueryParamState } from "@/hooks"
// Types
import type { Workshop } from "@/@types/API"
import { EXTENDED_WORKSHOPS_STATUSES, type ExtendedWorkshopStatus } from "@/data/workshopStatuses"
import type { UseMakeAPIRequestResult } from "@/hooks/useMakeAPIRequest"
import type { ParsedGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse/Parsed"
// Components
import { Box } from "@mui/material"
import * as WorkshopComponents from "@/components/workshop"
import InternalRedirection from "@/components/InternalRedirection"
import { Breadcrumbs, Button, Input, NumberOfResults, Pagination, Select, Table } from "@/components/templates/admin"
// Icons
import PublicRoundedIcon from "@mui/icons-material/PublicRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"

const WorkshopsPage: React.FunctionComponent = () => {
    // Query params
    const searchedPhrase = useURLQueryParamState<string>({ key: "search", defaultValue: "" })
    const selectedStatus = useURLQueryParamState<ExtendedWorkshopStatus>({ key: "status", defaultValue: "ALL" })

    const [searchFieldValue, setSearchFieldValue] = useState<string>(searchedPhrase.value)

    const { isDisabled: resetButtonIsDisabled, block: blockResetButtonAgain } = useDisableUntilChange<[ExtendedWorkshopStatus, string]>(
        true, //
        [selectedStatus.value, searchedPhrase.value]
    )

    // Pagination properties
    const currentPage = useURLQueryParamState<number>({ key: "page", defaultValue: 1 })
    const resultsPerPage = useURLQueryParamState<number>({ key: "resultsPerPage", defaultValue: 20 })

    // Fetch workshops
    // TODO: Replace with useMakeAPIRequest hook and fetch workshops
    const apiResponse: UseMakeAPIRequestResult.Result<ParsedGetPaginatedResourceResponse<Workshop>> = {
        status: "success",
        data: {
            content: WORKSHOPS_MOCKS,
            numberOfElements: WORKSHOPS_MOCKS.length,
            pagination: {
                currentPageIndex: 0,
                pagesInTotal: 2,
                perPage: 10,
            },
            resultsInTotal: WORKSHOPS_MOCKS.length,
        },
    }

    // Count all workshops
    // TODO: Replace with useMakeAPIRequest hook and count all workshops
    const countAllPartners: UseMakeAPIRequestResult.Result<number> = { status: "success", data: 10 }

    function resetEverything() {
        selectedStatus.reset()
        searchedPhrase.reset()
        setSearchFieldValue("")

        setTimeout(() => blockResetButtonAgain(["ALL", ""]), 10)
    }

    function handleSearchPhraseChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        searchedPhrase.update(e.target.value)
    }

    function handleSearchFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchFieldValue(e.target.value)
        debouncedHandleSearchPhraseChange(e)
    }

    const debouncedHandleSearchPhraseChange = useDebounce(handleSearchPhraseChange, 500)

    return (
        <>
            <Breadcrumbs
                current="Warsztaty"
                opositeSide={
                    <>
                        <InternalRedirection
                            label="Dodaj warsztat" //
                            to="/admin/workshop/new"
                            startAdornment={<AddCircleOutlineRoundedIcon />}
                        />

                        <NumberOfResults response={countAllPartners} />
                    </>
                }
            />

            <Box sx={{ display: "flex", gap: "8px" }}>
                <Input
                    placeholder="Wyszukaj warsztat po jego nazwie" //
                    sx={{ width: "420px" }}
                    value={searchFieldValue}
                    onChange={handleSearchFieldChange}
                    InputProps={{
                        startAdornment: <SearchRoundedIcon />,
                    }}
                />

                <Select
                    value={selectedStatus.value} //
                    options={EXTENDED_WORKSHOPS_STATUSES}
                    onChange={(e) => selectedStatus.update(e.target.value)}
                    startAdornment={<PublicRoundedIcon />}
                    sx={{
                        width: "240px",
                    }}
                ></Select>

                <Button variant="secondary" onClick={resetEverything} disabled={resetButtonIsDisabled}>
                    Wyczysc
                </Button>
            </Box>

            {(() => {
                switch (apiResponse.status) {
                    // TODO: Uncomment when usage of useMakeAPIRequest hook is implemented
                    // case "loading":
                    //     return <LinearProgress sx={{ mt: "12px" }} />
                    // case "error":
                    //     console.log(apiResponse)
                    //     return <h2>Wystąpił błąd podczas ładowania danych 😥</h2>

                    case "success":
                        return (
                            <>
                                <Table
                                    data={apiResponse.data.content} //
                                    columnsWidths={[14, 30, 20, 12, 12, 12]}
                                    columns={[
                                        {
                                            key: "startsAt",
                                            alias: "Data i godzina",
                                            render: (row) => new Date(row.startsAt).toLocaleString(),
                                        },
                                        {
                                            key: "title",
                                            alias: "Nazwa warsztatu",
                                            redirectToOnClick: (row) => `/admin/workshop?workshopId=${row.id}`,
                                        },
                                        {
                                            key: "university",
                                            alias: "Uczelnia",
                                            render: (row) => row.university.name,
                                        },
                                        {
                                            key: "company",
                                            alias: "Firma",
                                            render: (row) => row.company.name,
                                            redirectToOnClick: (row) => `/admin/partner?partnerId=${row.company.id}`,
                                        },
                                        {
                                            key: "status",
                                            alias: "Status",
                                            center: true,
                                            render: (value) => <WorkshopComponents.Status status={value.status} />,
                                        },
                                        {
                                            alias: "Zgłoszenia",
                                            render: (row) => "Zgłoszenia (7)",
                                            redirectToOnClick: (row) => `/admin/workshop-applications?workshopId=${row.id}`,
                                        },
                                    ]}
                                />

                                <Pagination
                                    currentPage={currentPage.value} //
                                    resultsPerPage={resultsPerPage.value}
                                    pagesInTotal={apiResponse.data.pagination.pagesInTotal}
                                    setCurrentPage={(value) => currentPage.update(value)}
                                    setResultsPerPage={(value) => resultsPerPage.update(value)}
                                />
                            </>
                        )
                }
            })()}
        </>
    )
}

export default WorkshopsPage
