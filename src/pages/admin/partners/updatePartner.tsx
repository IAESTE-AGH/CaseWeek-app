// Tools
import { useState } from "react"
import { API } from "@/services/api"
import { useQuery } from "react-query"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
// Types
import type { PartnerItem } from "@/api"
// Components
import SavePartnerView from "./_SavePartnerView"
import { CircularProgress } from "@/components/templates/admin"
// Icons

const UpdatePartnerPage: React.FunctionComponent = () => {
    const partnerId = getURLQueryParamValue<string>("partnerId")

    // Local state related to user data
    const [data, setData] = useState<Required<PartnerItem> | null>(null)

    // Fetch user data
    const { isLoading } = useQuery(
        "user", //
        () =>
            API.partners.getById3(partnerId!).then((res) => {
                setData(res.data as Required<PartnerItem>)
            })
    )

    // Loading spinner while fetching data
    if (isLoading || data === null) return <CircularProgress />

    return (
        <SavePartnerView
            breadcrumb="Edytuj partnera" //
            buttonPrompt="Zapisz zmiany"
            title="Edytowanie istniejącego partnera"
            apiRequest={{
                url: `/partners/${data.id}`,
                method: "PUT",
                mutationKey: "update-partner",
                successMessage: "Pomyślnie zaktualizowano partnera",
            }}
            initialData={{
                details: {
                    name: data.name,
                    shortDescription: data.shortDescription,
                    partnerType: data.partnerType,
                    websiteUrl: data.websiteUrl,
                    displayPriority: data.displayPriority,
                    longDescription: data.longDescription,
                    published: data.published ? "TRUE" : "FALSE",
                },
                logoUrl: data.logoUrl,
            }}
        />
    )
}

export default UpdatePartnerPage
