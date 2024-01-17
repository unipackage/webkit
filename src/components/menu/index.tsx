import {
    ItemTypeWithOptionalChildren,
    commonConvertDataToItems,
} from "../items"
import { MenuItemProps } from "antd/es/menu"

export type MenuItemTypeWithOptionalChildren =
    ItemTypeWithOptionalChildren<MenuItemProps>

export function convertDataToMenuItems<T extends Object>(
    data: T,
    special?: {
        [key in keyof T]?: ItemTypeWithOptionalChildren<MenuItemProps>
    },
    options?: {
        keyBlacklist?: (keyof T)[]
        keyWhitelist?: (keyof T)[]
        extra?: {
            [key: string]: MenuItemProps
        }
    }
): MenuItemProps[] {
    return commonConvertDataToItems<T, MenuItemProps>(data, special, options)
}
