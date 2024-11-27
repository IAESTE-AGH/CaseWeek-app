import type { ReactNode } from "react"

namespace CustomizedColumnFragments {
    interface Common<T extends Record<string, any>> {
        /* Label of the column */
        alias: string

        // ! Optional:
        copyToClipboard?: boolean

        center?: boolean
        /* Redirect to a specific page when clicking on a cell in this column */
        redirectToOnClick?: (row: T) => string
    }

    export interface WithOptionalRender<T extends Record<string, any>> extends Common<T> {
        /* Key of the column in the data object */
        key: keyof T

        /* Render a custom component in the cell */
        render?: (row: T) => ReactNode
    }

    export interface WithRenderOnly<T extends Record<string, any>> extends Common<T> {
        /* Render a custom component in the cell */
        render: (row: T) => ReactNode
    }
}

export type CustomizedColumn<T extends Record<string, any>> = CustomizedColumnFragments.WithOptionalRender<T> | CustomizedColumnFragments.WithRenderOnly<T>

/* Advanced variant of the Table component with features like custom columns labels, custom cell rendering, and redirections on click*/
export interface TableProps<T extends Record<string, any>> {
    data: T[]
    /* Ratio of the width of each column in the table **in percentage** */
    columnsWidths: number[]
    columns: (keyof T | CustomizedColumn<T>)[]

    /** Actions that can be performed on each row such as **Edit**, **Delete**, etc. */
    rowActions?: {
        /** Name of the action */
        name: string | ((row: T) => string)

        /** Icon of the action */
        icon: ReactNode | ((row: T) => ReactNode)

        /** Whether the action should be displayed in red color */
        redColor?: boolean

        /** Function to execute when the action is clicked */
        action: (row: T) => void

        /** Tooltip to display when hovering over the action */
        tooltip: string | ((row: T) => string)
    }[]
}
