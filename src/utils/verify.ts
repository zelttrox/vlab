// Verify if container name is valid
export function IsContainerNameValid(name: string) {
    if (name == "" || name == undefined) return false
    const regex = /^[a-z0-9-_]+$/i
    return regex.test(name)
}