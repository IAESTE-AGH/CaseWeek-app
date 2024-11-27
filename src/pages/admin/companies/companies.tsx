// Tools
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { normalizePaginatedDataResponse } from "@/utils"
import { useURLQueryParamState, useDebounce, useDisableUntilChange, useMakeAPIRequest } from "@/hooks"
// Types
import type { Company } from "@/@types/API"
import type { ParsedGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse"
// Components
import { Box, LinearProgress } from "@mui/material"
import ExternalRedirection from "@/components/ExternalRedirection"
import { Breadcrumbs, Button, Input, Pagination, Table } from "@/components/templates/admin"
// Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded"

export default function AdminCompaniesPage() {
    const navigate = useNavigate()

    const searchedPhrase = useURLQueryParamState<string>({ key: "search", defaultValue: "" })
    const [searchFieldValue, setSearchFieldValue] = useState<string>(searchedPhrase.value)

    const { isDisabled: resetButtonIsDisabled, block: blockResetButtonAgain } = useDisableUntilChange(true, [searchedPhrase.value])

    const debouncedHandleSearchPhraseChange = useDebounce(handleSearchPhraseChange, 500)

    const currentPage = useURLQueryParamState<number>({ key: "page", defaultValue: 1 })
    const resultsPerPage = useURLQueryParamState<number>({ key: "resultsPerPage", defaultValue: 20 })

    const [apiResponse] = useMakeAPIRequest<ParsedGetPaginatedResourceResponse<Company>>({
        method: "GET",
        path: "/companies/",
        pathParams: [
            { name: "page", value: currentPage.value - 1 },
            { name: "size", value: resultsPerPage.value },
            { name: "search", value: searchedPhrase.value, condition: searchedPhrase.value !== "" },
        ],
        queryKey: "companies",

        formatReceivedData: (data) => normalizePaginatedDataResponse<Company>(data),
    })

    const [countAllCompanies] = useMakeAPIRequest<number>({
        method: "GET",
        path: "/companies/?size=1",
        queryKey: "count-all-companies",
        formatReceivedData: (data) => normalizePaginatedDataResponse<Company>(data).resultsInTotal,
    })

    function resetEverything() {
        searchedPhrase.reset()
        setSearchFieldValue("")

        setTimeout(blockResetButtonAgain, 10)
    }

    function handleSearchFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchFieldValue(e.target.value)
        debouncedHandleSearchPhraseChange(e)
    }

    function handleSearchPhraseChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        searchedPhrase.update(e.target.value)
    }

    return (
        <>
            <Breadcrumbs
                current="Firmy" //
                opositeSide={
                    <>
                        <Button variant="transparent" onClick={() => navigate("/admin/company/new")}>
                            <AddCircleOutlineIcon />
                            <span>Dodaj firmę</span>
                        </Button>

                        <Button variant="transparent">
                            <FileDownloadRoundedIcon />
                            <span>Pobierz (csv)</span>
                        </Button>

                        <Box
                            sx={{
                                background: "#26A69A",
                                color: "#fff",
                                padding: "12px 16px",
                                display: "flex",
                                gap: "4px",
                                borderRadius: "3px",
                            }}
                        >
                            {(() => {
                                switch (countAllCompanies.status) {
                                    case "loading":
                                        return <span>Ładowanie</span>
                                    case "success":
                                        return (
                                            <>
                                                <span style={{ flexGrow: 1 }}>Wyniki: </span>
                                                <strong>{countAllCompanies.data}</strong>
                                            </>
                                        )
                                    case "error":
                                        return <span>Wystąpił błąd</span>
                                }
                            })()}
                        </Box>
                    </>
                }
            />

            <Box sx={{ display: "flex", gap: "8px" }}>
                <Input
                    placeholder="Wyszukaj nazwy firmy" //
                    sx={{ width: "420px" }}
                    value={searchFieldValue}
                    onChange={handleSearchFieldChange}
                    InputProps={{
                        startAdornment: <SearchRoundedIcon />,
                    }}
                />

                <Button variant="secondary" onClick={resetEverything} disabled={resetButtonIsDisabled}>
                    Wyczysc
                </Button>
            </Box>

            {(() => {
                switch (apiResponse.status) {
                    case "loading":
                        return <LinearProgress />
                    case "error":
                        console.warn(apiResponse)
                        return <span>Wystąpił błąd podczas ładowania danych 😥</span>
                    case "success":
                        return (
                            <>
                                <Table
                                    data={apiResponse.data.content} //
                                    columnsWidths={[10, 30, 30, 30]}
                                    columns={[
                                        {
                                            key: "logoUrl",
                                            alias: "Logo",
                                            render: (data) => (
                                                <img
                                                    src={data.logoUrl} //
                                                    alt={`Logo firmy ${data.name}`}
                                                    style={{ maxHeight: 50, objectFit: "cover" }}
                                                />
                                            ),
                                        },
                                        {
                                            key: "name",
                                            alias: "Nazwa firmy",
                                            redirectToOnClick: (data) => `/admin/company?companyId=${data.id}`,
                                            render: (data) => data.name,
                                        },
                                        {
                                            key: "shortDescription",
                                            alias: "Krótki opis",
                                            render: (data) => `${data.shortDescription}`,
                                        },
                                        {
                                            key: "websiteUrl",
                                            alias: "Link do strony",
                                            render: (data) => <ExternalRedirection to={data.websiteUrl} />,
                                        },
                                    ]}
                                />
                                <Pagination
                                    pagesInTotal={apiResponse.data.pagination.pagesInTotal} //
                                    currentPage={currentPage.value} //
                                    resultsPerPage={resultsPerPage.value}
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
