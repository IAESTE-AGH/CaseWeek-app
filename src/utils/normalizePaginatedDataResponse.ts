import type { RawGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse/Raw"
import type { ParsedGetPaginatedResourceResponse } from "@/@types/GetPaginatedResourceResponse/Parsed"

export function normalizePaginatedDataResponse<T>(response: RawGetPaginatedResourceResponse<T>): ParsedGetPaginatedResourceResponse<T> {
    return {
        content: response.content,
        resultsInTotal: response.totalElements,
        numberOfElements: response.numberOfElements,
        pagination: {
            perPage: response.pageable.pageSize,
            pagesInTotal: response.totalPages,
            currentPageIndex: response.number,
        },
    }
}
