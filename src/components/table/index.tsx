import React from "react"
import { Space, Table as AntTable } from "antd"
import { ColumnsType } from "antd/es/table"
import { formatTitle } from "../../shared/format"

/**
 * Props interface for the TableComponent.
 * @template T - Generic type for data items.
 */
interface ITableProps<T extends { key: React.ReactNode }> {
    data: T[] // Array of data items to display in the table.
    columns: ColumnsType<T> // Configuration for table columns.
}

/**
 * Generates table columns based on the provided width configuration.
 * @template T - Generic type for data items.
 * @param {Object} widthConfig - Configuration for column widths.
 * @returns {ColumnsType<T>} - An array of table columns.
 */
export function generateTableColumns<
    T extends { key: React.ReactNode }
>(widthConfig: {
    [key in Exclude<keyof T, "key">]: string
}): ColumnsType<T> {
    return Object.keys(widthConfig as Exclude<T, { key: React.ReactNode }>).map(
        (key) => ({
            title: formatTitle(key), // Format column titles using formatTitle function.
            dataIndex: key,
            key,
            width: widthConfig?.[key as Exclude<keyof T, "key">] || undefined,
        })
    )
}

/**
 * TableComponent displays data in a table.
 * @template T - Generic type for data items.
 * @param {ITableProps<T>} props - The component's props.
 * @returns {JSX.Element} - A React JSX element representing the table component.
 */
export function Table<T extends { key: React.ReactNode }>({
    data,
    columns,
}: ITableProps<T>) {
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}></Space>
            <AntTable columns={columns} dataSource={data} />
        </>
    )
}

/**
 * Converts an array of data items into table items based on a mapper function.
 *
 * @template T - Generic type for the source data items.
 * @template U - Generic type for the resulting table items.
 * @param {T[] | undefined | null} data - Array of source data items.
 * @param {(item: T) => U} mapper - Mapper function to transform source items to table items.
 * @returns {U[]} - An array of resulting table items.
 */
export function convertDataToTableItems<
    T,
    U extends Partial<Record<keyof T, any>> & { key: React.ReactNode }
>(data: T[] | undefined | null, mapper: (item: T) => U): U[] {
    const result: (U & { key: React.ReactNode })[] = []

    if (data && data.length > 0) {
        data.forEach((item, index) => {
            const tableItem = mapper(item)
            if (tableItem) {
                result[index] = tableItem
            }
        })
    }

    return result
}
