/** Spring Boot REST response for a paginated resource */
export interface RawGetPaginatedResourceResponse<T> {
    /** The content of the response */
    content: T[]
    /** Information about the pagination */
    pageable: {
        /** The page number */
        pageNumber: number
        /** The size of each page */
        pageSize: number
        /** Information about the sorting */
        sort: {
            /** Flag indicating if the sort is empty */
            empty: boolean
            /** Flag indicating if the sort is sorted */
            sorted: boolean
            /** Flag indicating if the sort is unsorted */
            unsorted: boolean
        }
        /** The offset */
        offset: number
        /** Flag indicating if pagination is used */
        paged: boolean
        /** Flag indicating if pagination is not used */
        unpaged: boolean
    }
    /** Flag indicating if it's the last page */
    last: boolean
    /** Total number of pages */
    totalPages: number
    /** Total number of elements */
    totalElements: number
    /** The size of the page */
    size: number
    /** The current page number */
    number: number
    /** Flag indicating if it's the first page */
    first: boolean
    /** Number of elements in the current page */
    numberOfElements: number
    /** Flag indicating if the response is empty */
    empty: boolean
}
