export function isValidUrl(url : string) {
    try {
        new URL(url)
        return true
    } catch (e) { return false }
}
export function clone(obj : Object) {
    return JSON.parse(JSON.stringify(obj))
}