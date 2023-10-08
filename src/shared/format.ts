/**
 * Format a title by converting the given string to title case.
 * @param {string} key - The string to format.
 * @returns {string} - The formatted title.
 */
export function formatTitle(key: string): string {
    // Capitalize the first letter of the string
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1)

    // Add a space before each uppercase letter to create title case
    const finalTitle = formattedKey.replace(/([A-Z])/g, " $1")

    return finalTitle
}
