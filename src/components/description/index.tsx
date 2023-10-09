import React from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions as AntdDescriptions } from "antd"
import { formatTitle } from "../../shared/format"

interface IDescriptionsProps {
    title: string
    items: DescriptionsProps["items"]
}

export function Descriptions({ title, items }: IDescriptionsProps) {
    return (
        <>
            <AntdDescriptions title={title} items={items} />
        </>
    )
}

export function convertDataToDescriptionItems<T>(
    data: T,
    customMappers: Partial<
        Record<keyof T, (value: T[keyof T]) => React.ReactNode>
    > = {}
): DescriptionsProps["items"] {
    const items = []

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
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

    return items as DescriptionsProps["items"]
}
