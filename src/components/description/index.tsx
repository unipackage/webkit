import React from "react"
import type { DescriptionsProps } from "antd"
import { Descriptions as AntdDescriptions } from "antd"

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
