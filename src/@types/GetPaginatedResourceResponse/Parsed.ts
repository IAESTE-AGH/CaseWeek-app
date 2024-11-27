/** Normalized response for paginated resources */
export interface ParsedGetPaginatedResourceResponse<T> {
    content: T[]
    resultsInTotal: number
    numberOfElements: number

    pagination: {
        perPage: number
        pagesInTotal: number
        currentPageIndex: number
    }
}
