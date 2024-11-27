export function addSpacesToPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{3,})/, "$1 $2 $3")
}
