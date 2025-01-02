export type TWorkshopCard = {
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
}
