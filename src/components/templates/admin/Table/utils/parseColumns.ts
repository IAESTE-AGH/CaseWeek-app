import type { TableProps, CustomizedColumn } from "../@types"

export function parseColumns(columns: TableProps<any>["columns"]): CustomizedColumn<any>[] {
    return columns.map((column) => {
        if (typeof column === "string") {
            return {
                key: column,
                alias: column,
            }
        }
        return column as CustomizedColumn<any>
    })
}
