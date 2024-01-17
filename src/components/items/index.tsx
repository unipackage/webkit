import React from "react"
import { formatTitle } from "../../shared/format"

export type ItemTypeWithOptionalChildren<U> = Omit<U, "children"> & {
    children?: React.ReactNode
}

interface KeyLabelChildren {
    key?: any
    label?: any
    children?: React.ReactNode
}

export function commonConvertDataToItems<
    T extends Object,
    U extends KeyLabelChildren
>(
    data: T,
    special?: {
        [key in keyof T]?: ItemTypeWithOptionalChildren<U>
    },
    options?: {
        keyBlacklist?: (keyof T)[]
        keyWhitelist?: (keyof T)[]
        extra?: {
            [key: string]: U
        }
    }
): U[] {
    const items: U[] = []

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
            //@ts-ignore
            items.push({
                key: key.toString(),
                label: formatTitle(key.toString()),
                children: <>{value}</>,
                ...special?.[key],
            })
        }
    }

    if (options?.extra) {
        for (const key in options.extra) {
            if (Object.prototype.hasOwnProperty.call(options.extra, key)) {
                //@ts-ignore
                items.push({
                    key: key,
                    label: formatTitle(key.toString()),
                    ...options.extra[key],
                })
            }
        }
    }

    return items
}
