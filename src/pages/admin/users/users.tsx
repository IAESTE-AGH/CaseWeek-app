// Tools
import { useState } from "react"
import { USER_ROLES_EXTENDED } from "@/data/userRoles"
import { addSpacesToPhoneNumber, normalizePaginatedDataResponse } from "@/utils"
import { useDebounce, useMakeAPIRequest, useURLQueryParamState, useDisableUntilChange } from "@/hooks"
// Types
import type { User } from "@/@types/API"
import type { ExtendedUserRole } from "@/data/userRoles"
import type { ParsedGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse"
// Components
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import UserRoleBadge from "@/components/templates/admin/UserRoleBadge"
import NumberOfResults from "@/components/templates/admin/NumberOfResults"
import { Breadcrumbs, Select, Button, Input, Pagination, Table } from "@/components/templates/admin"
// MUI Icons
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded"

const AdminUsersPage: React.FunctionComponent = () => {
    // Query params
    const selectedRole = useURLQueryParamState<ExtendedUserRole>({ key: "role", defaultValue: "ALL" })
    const searchedPhrase = useURLQueryParamState<string>({ key: "search", defaultValue: "" })
    const [searchFieldValue, setSearchFieldValue] = useState<string>(searchedPhrase.value)

    const { isDisabled: resetButtonIsDisabled, block: blockResetButtonAgain } = useDisableUntilChange<[ExtendedUserRole, string]>(true, [selectedRole.value, searchedPhrase.value])

    // Pagination properties
    const currentPage = useURLQueryParamState<number>({ key: "page", defaultValue: 1 })
    const resultsPerPage = useURLQueryParamState<number>({ key: "resultsPerPage", defaultValue: 20 })

    // Data fetching
    const [apiResponse] = useMakeAPIRequest<ParsedGetPaginatedResourceResponse<User>>({
        method: "GET",
        path: "/users/",
        pathParams: [
            { name: "page", value: currentPage.value - 1 },
            { name: "size", value: resultsPerPage.value },
            { name: "role", value: selectedRole.value, condition: selectedRole.value !== "ALL" },
            { name: "search", value: searchedPhrase.value, condition: searchedPhrase.value !== "" },
        ],
        queryKey: "users",

        formatReceivedData: (data) => normalizePaginatedDataResponse<User>(data),
    })

    // Count all users- to it once
    const [countAllUsers] = useMakeAPIRequest<number>({
        method: "GET",
        path: "/users/?size=1",
        queryKey: "count-all-users",
        formatReceivedData: (data) => normalizePaginatedDataResponse<User>(data).resultsInTotal,
    })

    function resetEverything() {
        selectedRole.reset()
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
                current="Użytkownicy"
                opositeSide={
                    <>
                        <Button variant="transparent">
                            <FileDownloadRoundedIcon />
                            <span>Pobierz (csv)</span>
                        </Button>

                        <NumberOfResults response={countAllUsers} />
                    </>
                }
            />
            <Box sx={{ display: "flex", gap: "8px" }}>
                <Input
                    placeholder="Wyszukaj imienia, nazwiska lub adresu email" //
                    sx={{ width: "420px" }}
                    value={searchFieldValue}
                    onChange={handleSearchFieldChange}
                    InputProps={{
                        startAdornment: <SearchRoundedIcon />,
                    }}
                />

                <Select
                    value={selectedRole.value} //
                    options={USER_ROLES_EXTENDED}
                    onChange={(e) => selectedRole.update(e.target.value)}
                    startAdornment={<GroupRoundedIcon />}
                    sx={{
                        width: "280px",
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
                        return <span>Wystąpił błąd podczas ładowania danych 😥</span>

                    case "success":
                        return (
                            <>
                                <Table
                                    data={apiResponse.data.content} //
                                    columnsWidths={[24, 32, 28, 16]}
                                    columns={[
                                        {
                                            key: "firstName",
                                            alias: "Nazwisko i imię",
                                            redirectToOnClick: (data) => `/admin/user?userId=${data.id}`,
                                            render: (data) => (
                                                <>
                                                    <span>{`${data.firstName} ${data.lastName}`}</span>
                                                    <UserRoleBadge role={data.role} />
                                                </>
                                            ),
                                        },
                                        {
                                            key: "university",
                                            alias: "Uczelnia",
                                            render: (data) => data.university.name,
                                        },
                                        {
                                            key: "email",
                                            alias: "Email",
                                            copyToClipboard: true,
                                            render: (data) => <a href={`mailto:${data.email}`}>{data.email}</a>,
                                        },
                                        {
                                            key: "phoneNumber",
                                            alias: "Telefon",
                                            copyToClipboard: true,
                                            render: (data) => <a href={`tel:${data.phoneNumber}`}>{addSpacesToPhoneNumber(data.phoneNumber)}</a>,
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

export default AdminUsersPage
