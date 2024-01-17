import {
    ItemTypeWithOptionalChildren,
    commonConvertDataToItems,
} from "../items"
import { DescriptionsItemType } from "antd/es/descriptions"

export type DescriptionsItemTypeWithOptionalChildren =
    ItemTypeWithOptionalChildren<DescriptionsItemType>

export function convertDataToDescriptionsItems<T extends Object>(
    data: T,
    special?: {
        [key in keyof T]?: ItemTypeWithOptionalChildren<DescriptionsItemType>
    },
    options?: {
        keyBlacklist?: (keyof T)[]
        keyWhitelist?: (keyof T)[]
        extra?: {
            [key: string]: DescriptionsItemType
        }
    }
): DescriptionsItemType[] {
    return commonConvertDataToItems<T, DescriptionsItemType>(
        data,
        special,
        options
    )
}
