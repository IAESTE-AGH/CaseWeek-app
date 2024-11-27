import { Stack, SxProps, styled } from "@mui/material"

import Select from "./Select"
import MuiPagination from "@mui/material/Pagination"

interface PaginationProps {
    /* The total number of pages, this should come from the server */
    pagesInTotal: number

    /* The current page, value of query params variable */
    currentPage: number
    /* The number of results per page, value of query params variable */
    resultsPerPage: number

    /* The function that sets the current page, should set the query params variable */
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>

    /* The function that sets the number of results per page, should set the query params variable */
    setResultsPerPage: React.Dispatch<React.SetStateAction<number>>

    /* The sx props from Material UI */
    sx?: SxProps
}

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
    button: {
        height: "50px",
        aspectRatio: "1",
        borderColor: "#000",
        color: "#000",
    },
    "li:nth-of-type(1)>button": {
        marginLeft: "0 !important",
    },

    ".Mui-selected": {
        background: "#000 !important",
        color: "#fff",
        borderColor: "#000 !important",
    },
}))

const RESULTS_PER_PAGE_OPTIONS = [10, 20, 50, 100, 200, 500]

const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
    return (
        <Stack spacing="8px">
            <Stack flexDirection="row" alignItems="center" gap="12px">
                <label>Wyników na stronę: </label>

                <Select
                    value={props.resultsPerPage} //
                    onChange={(event) => props.setResultsPerPage(event.target.value as number)}
                    options={RESULTS_PER_PAGE_OPTIONS}
                    //
                    sx={{ width: "96px", ...props.sx }}
                ></Select>
            </Stack>

            {props.pagesInTotal > 1 && (
                <StyledPagination
                    count={props.pagesInTotal} //
                    page={props.currentPage}
                    onChange={(_, page) => props.setCurrentPage(page)}
                    //
                    showFirstButton={props.pagesInTotal > 5}
                    showLastButton={props.pagesInTotal > 5}
                    variant="outlined"
                    shape="rounded"
                    sx={{ ...props.sx }}
                ></StyledPagination>
            )}
        </Stack>
    )
}

export default Pagination
