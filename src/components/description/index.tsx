import React from "react"
import { DescriptionsItemType } from "antd/es/descriptions"
import { formatTitle } from "../../shared/format"

export type DescriptionsItemTypeWithOptionalChildren = Omit<
    DescriptionsItemType,
    "children"
> & {
    children?: React.ReactNode
}

export function convertDataToDescriptionsItems<T extends Object>(
    data: T,
    special?: {
        [key in keyof T]?: DescriptionsItemTypeWithOptionalChildren
    },
    options?: {
        keyBlacklist?: (keyof T)[]
        keyWhitelist?: (keyof T)[]
        extra?: {
            [key: string]: DescriptionsItemType
        }
    }
): DescriptionsItemType[] {
    const items: DescriptionsItemType[] = []

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
            items.push({
                key: key.toString(),
                label: formatTitle(key.toString()),
                children: <span>value</span>,
                ...special?.[key],
            })
        }
    }

    if (options?.extra) {
        for (const key in options.extra) {
            if (Object.prototype.hasOwnProperty.call(options.extra, key)) {
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
