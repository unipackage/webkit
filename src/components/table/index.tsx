import { formatTitle } from "../../shared/format"
import React from "react"
import type { TablePaginationConfig } from "antd/es/table"
import { ColumnsType, ColumnType, ColumnGroupType } from "antd/es/table"

/**
 * Generates table columns based on the provided width configuration.
 * @template T - Generic type for data items.
 * @param {Object} config - Configuration object containing shared and independent column settings.
 * @param {ColumnGroupType<T> | ColumnType<T>} config.shared - Shared column settings.
 * @param {Object} config.independent - Independent column settings for each key.
 * @returns {ColumnsType<T>} - An array of table columns.
 */
export function generateTableColumns<
    T extends { key: React.ReactNode }
>(config: {
    shared: ColumnGroupType<T> | ColumnType<T>
    independent: {
        [key in Exclude<keyof T, "key">]: ColumnGroupType<T> | ColumnType<T>
    }
}): ColumnsType<T> {
    return Object.keys(
        config.independent as Exclude<T, { key: React.ReactNode }>
    ).map((key) => ({
        title: formatTitle(key), // Use the key as the column title,and format column titles using formatTitle function.
        dataIndex: key,
        key, // Set the key for the column.
        ...config.shared,
        ...config.independent[key as Exclude<keyof T, "key">],
    }))
}

/**
 * Extends each item in the input array with a key field.
 * @template T - Generic type for data items.
 * @param {Object} input - Input object containing an array of data and a key field.
 * @param {T[]} input.dataArray - Array of data items.
 * @param {keyof T} input.keyField - Key field to use for generating keys.
 * @returns {T[]} - An array of data items with added key fields.
 */
export function extendWithKeyForTableData<T extends Object>(input: {
    dataArray: T[]
    keyField: keyof T
}) {
    return input.dataArray.map((data) => {
        // Use the specified key field to generate the key.
        const key = <>{JSON.stringify(data[input.keyField])}</>
        return { ...data, key }
    })
}

/**
 * Interface for table props.
 * @template T - Generic type for data items.
 */
export interface ITableProps<T> {
    data: T[] // Array of data items.
    pagination: TablePaginationConfig // Pagination configuration.
    loading: boolean // Loading state.
    onChange: (pagination: TablePaginationConfig) => void // Callback for change events.
}
