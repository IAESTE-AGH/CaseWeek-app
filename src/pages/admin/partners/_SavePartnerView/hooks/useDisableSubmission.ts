// Tools
import { RESTRICTIONS } from "../length_restrictions"
import { useFormSubmissionDisability } from "@/hooks/useFormSubmissionDisability"
// Types
import type { PartnerCompoundedData } from "../@types"
import type { SavePartner as SavePartnerInterface } from "@/@types/API"

interface IUseDisableSubmissionProps {
    state: SavePartnerInterface
    imagePreviewURL: string | null
    initialData: PartnerCompoundedData | null
}

export function useDisableSubmission({ state, imagePreviewURL, initialData }: IUseDisableSubmissionProps) {
    // Check if any of the fields does not match their requirements
    const someFieldDoesNotMatchLengthRequirnments: boolean = useFormSubmissionDisability({
        requirnments: [
            { value: state.name, ...RESTRICTIONS["name"] },
            { value: state.shortDescription, ...RESTRICTIONS["shortDescription"] },
            { value: state.longDescription, ...RESTRICTIONS["longDescription"] },
            { value: state.websiteUrl, ...RESTRICTIONS["websiteUrl"] },
            { value: imagePreviewURL },
        ],
    })

    // If initial data is not provided, base the decision on the length requirements only
    if (initialData === null) return someFieldDoesNotMatchLengthRequirnments

    // Otherwise, compare the current state with the initial data
    const juxtapositionCurrentAndInitialValues: { actual: any; expected: any }[] = [
        { actual: state.name, expected: initialData.details.name },
        { actual: state.shortDescription, expected: initialData.details.shortDescription },
        { actual: state.longDescription, expected: initialData.details.longDescription },
        { actual: state.websiteUrl, expected: initialData.details.websiteUrl },
        { actual: state.displayPriority, expected: initialData.details.displayPriority },
        { actual: state.partnerType, expected: initialData.details.partnerType },
        { actual: state.published, expected: initialData.details.published },
        { actual: imagePreviewURL, expected: initialData.logoUrl },
    ]

    // Check if the data has not been updated
    const dataHasNotBeenUptated: boolean = juxtapositionCurrentAndInitialValues.every((el) => el.actual === el.expected)

    // Base the decision on both the length requirements and the data update status
    return someFieldDoesNotMatchLengthRequirnments || dataHasNotBeenUptated
}
