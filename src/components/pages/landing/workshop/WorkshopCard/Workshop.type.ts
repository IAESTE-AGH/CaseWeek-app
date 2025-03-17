export type TWorkshopCard = {
    id:string
    startsAt: string
    minYearOfStudy: number
    maxYearOfStudy: number
    durationMinutes: number
    university: {
        name: string
    }
    preferableFieldsOfStudy: {
        id: string
        name: string
    }[]
    address: string
    company: {
        name: string
        logoUrl: string
    }
    title: string
    propositions?: {
        id: string[];
    }
}
