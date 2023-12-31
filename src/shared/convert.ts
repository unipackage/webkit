import React from "react"
import { formatTitle } from "./format"

interface Item {
    key: any
    label: React.ReactNode
    children: React.ReactNode
}

export function convertDataToItems<T>(
    data: T,
    customMappers: Partial<
        Record<keyof T, (value: T[keyof T]) => React.ReactNode>
    > = {},
    options?: {
        keyBlacklist?: (keyof T)[]
        keyWhitelist?: (keyof T)[]
        extra?: Record<string, React.ReactNode>
    }
): Item[] {
    const items = []

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (
                options?.keyBlacklist &&
                options.keyBlacklist.includes(key as keyof T)
            ) {
                continue
            }

            if (
                options?.keyWhitelist &&
                !options.keyWhitelist.includes(key as keyof T)
            ) {
                continue
            }

            const value = data[key]
            if (
                typeof value === "object" &&
                !Array.isArray(value) &&
                !React.isValidElement(value)
            ) {
                continue
            }
            const customMapper = customMappers[key]
            const children = customMapper ? customMapper(value) : value
            items.push({
                key: key.toString(),
                label: formatTitle(key.toString()),
                children,
            })
        }
    }

    if (options?.extra) {
        for (const key in options.extra) {
            if (Object.prototype.hasOwnProperty.call(options.extra, key)) {
                items.push({
                    key: key,
                    label: formatTitle(key.toString()),
                    children: options.extra[key],
                })
            }
        }
    }

    return items as Item[]
}
