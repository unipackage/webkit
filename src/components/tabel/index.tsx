import React from "react"
import { Space, Table } from "antd"
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
export function generateTabelColumns<
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
export function Tabel<T extends { key: React.ReactNode }>({
    data,
    columns,
}: ITableProps<T>) {
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}></Space>
            <Table columns={columns} dataSource={data} />
        </>
    )
}
