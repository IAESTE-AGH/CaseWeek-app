import TableField from "./TableField"
import { parseColumns } from "./utils/parseColumns"

import type { TableProps } from "./@types"

import TableBase from "./TableBase"
import NoResults from "./NoResults"
import RowActions from "./RowActions"

export default function Table<T extends Record<string, any>>(props: TableProps<T>) {
    const columns = parseColumns(props.columns)
    const data = props.data

    // Check if columnsWidths.length is equal to columns.length
    if (props.columnsWidths.length !== columns.length) {
        throw new Error("columnsWidths.length must be equal to columns.length")
    }

    // Check if columnsWidths sum is equal to 100
    if (props.columnsWidths.reduce((acc, width) => acc + width, 0) !== 100) {
        throw new Error("columnsWidths sum must be equal to 100")
    }

    return (
        <>
            <TableBase
                columnsWidths={props.columnsWidths} //
                thereAreColumnActions={props.rowActions !== undefined}
            >
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.alias}</th>
                        ))}

                        {props.rowActions !== undefined && <th>Akcje</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, columnIndex) => {
                                const { alias: _, key, ...propsToForward } = column as any

                                return (
                                    <TableField
                                        key={columnIndex} //
                                        data={row}
                                        field={key as keyof T}
                                        {...propsToForward}
                                    />
                                )
                            })}

                            {props.rowActions !== undefined && (
                                <td>
                                    <RowActions actions={props.rowActions} data={row} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </TableBase>

            {data.length === 0 && <NoResults>Brak danych spełniających podane kryteria</NoResults>}
        </>
    )
}
