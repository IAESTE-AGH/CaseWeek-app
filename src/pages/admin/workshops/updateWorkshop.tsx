// Tools
import { Breadcrumbs } from "@/components/templates/admin"
import { getURLQueryParamValue } from "@/hooks/useURLQueryParamState"
// Types

const UpdateWorkshopPage: React.FunctionComponent = () => {
    // User id from URL
    const workshopId = getURLQueryParamValue<string>("workshopId")

    return (
        <>
            <h1>Update workshop</h1>
            <strong>Id: </strong> <span>{workshopId}</span>
        </>
    )
}

export default UpdateWorkshopPage
