// Components
import SavePartnerView from "./_SavePartnerView"

const AddPartner: React.FunctionComponent = () => {
    return (
        <SavePartnerView
            breadcrumb="Dodaj partnera" //
            buttonPrompt="Utwórz partnera"
            title="Dodawanie nowego partnera"
            apiRequest={{
                url: "/partners/",
                method: "POST",
                mutationKey: "create-partner",
                successMessage: "Pomyślnie dodano partnera",
            }}
        />
    )
}

export default AddPartner
