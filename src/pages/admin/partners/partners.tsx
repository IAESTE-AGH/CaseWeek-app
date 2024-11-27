// Tools
import { useState } from "react"
import { normalizePaginatedDataResponse } from "@/utils/normalizePaginatedDataResponse"
import { EXTENDED_PARTNERSHIP_VARIANTS, EXTENDED_PARTNERSHIP_STATUSES } from "@/data/partners"
import { useDebounce, useMakeAPIRequest, useURLQueryParamState, useDisableUntilChange } from "@/hooks"
// Types
import type { Partner } from "@/@types/API"
import type { ExtendedPartnerType, ExtendedPartnershipStatus } from "@/data/partners/@types"
import type { ParsedGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse/Parsed"
// Components
import { Box, LinearProgress } from "@mui/material"
import InternalRedirection from "@/components/InternalRedirection"
import NumberOfResults from "@/components/templates/admin/NumberOfResults"
import TableOfPartners from "@/components/pages/admin/partners/TableOfPartners"
import { Breadcrumbs, Button, Input, Pagination, Select } from "@/components/templates/admin"
// Icons
import CasesRoundedIcon from "@mui/icons-material/CasesRounded"
import PublicRoundedIcon from "@mui/icons-material/PublicRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
// Material UI Icons
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"

const Partners: React.FunctionComponent = () => {
    // Query params
    const searchedPhrase = useURLQueryParamState<string>({ key: "search", defaultValue: "" })
    const selectedStatus = useURLQueryParamState<ExtendedPartnershipStatus>({ key: "status", defaultValue: "ALL" })
    const selectedType = useURLQueryParamState<ExtendedPartnerType>({ key: "status", defaultValue: "ALL" })
    const [searchFieldValue, setSearchFieldValue] = useState<string>(searchedPhrase.value)

    const { isDisabled: resetButtonIsDisabled, block: blockResetButtonAgain } = useDisableUntilChange<[ExtendedPartnershipStatus, ExtendedPartnerType, string]>(
        true, //
        [selectedStatus.value, selectedType.value, searchedPhrase.value]
    )

    // Pagination properties
    const currentPage = useURLQueryParamState<number>({ key: "page", defaultValue: 1 })
    const resultsPerPage = useURLQueryParamState<number>({ key: "resultsPerPage", defaultValue: 20 })

    // Fetch partners
    const [apiResponse, refetchPartners] = useMakeAPIRequest<ParsedGetPaginatedResourceResponse<Partner>>({
        method: "GET",
        path: "/partners/",
        pathParams: [
            { name: "page", value: currentPage.value - 1 },
            { name: "size", value: resultsPerPage.value },
            { name: "type", value: selectedType.value, condition: selectedType.value !== "ALL" },
            { name: "search", value: searchedPhrase.value, condition: searchedPhrase.value !== "" },
            { name: "published", value: selectedStatus.value, condition: selectedStatus.value !== "ALL" },
        ],
        queryKey: "partners",

        formatReceivedData: (data) => normalizePaginatedDataResponse<Partner>(data),
    })

    // Count all partners
    const [countAllPartners] = useMakeAPIRequest<number>({
        method: "GET",
        path: "/partners/?size=1",
        queryKey: "count-all-partners",
        formatReceivedData: (data) => normalizePaginatedDataResponse(data).resultsInTotal,
    })

    function resetEverything() {
        selectedType.reset()
        selectedStatus.reset()
        searchedPhrase.reset()
        setSearchFieldValue("")

        setTimeout(() => blockResetButtonAgain(["ALL", "ALL", ""]), 10)
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
                current="Partnerzy"
                opositeSide={
                    <>
                        <InternalRedirection
                            label="Dodaj partnera" //
                            to="/admin/partner/new"
                            startAdornment={<AddCircleOutlineRoundedIcon />}
                        />

                        <NumberOfResults response={countAllPartners} />
                    </>
                }
            />

            <Box sx={{ display: "flex", gap: "8px" }}>
                <Input
                    placeholder="Wyszukaj partnera po jego nazwie" //
                    sx={{ width: "420px" }}
                    value={searchFieldValue}
                    onChange={handleSearchFieldChange}
                    InputProps={{
                        startAdornment: <SearchRoundedIcon />,
                    }}
                />

                <Select
                    value={selectedStatus.value} //
                    options={EXTENDED_PARTNERSHIP_STATUSES}
                    onChange={(e) => selectedStatus.update(e.target.value)}
                    startAdornment={<PublicRoundedIcon />}
                    sx={{
                        width: "240px",
                    }}
                ></Select>

                <Select
                    value={selectedType.value} //
                    options={EXTENDED_PARTNERSHIP_VARIANTS}
                    onChange={(e) => selectedType.update(e.target.value)}
                    startAdornment={<CasesRoundedIcon />}
                    sx={{
                        width: "260px",
                    }}
                ></Select>

                <Button variant="secondary" onClick={resetEverything} disabled={resetButtonIsDisabled}>
                    Wyczysc
                </Button>
            </Box>

            {(() => {
                switch (apiResponse.status) {
                    case "loading":
                        return <LinearProgress sx={{ mt: "12px" }} />
                    case "error":
                        console.log(apiResponse)
                        return <h2>Wystąpił błąd podczas ładowania danych 😥</h2>
                    case "success":
                        return (
                            <>
                                <TableOfPartners
                                    data={apiResponse.data.content} //
                                    refetchPartners={refetchPartners}
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

export default Partners
