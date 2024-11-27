// Tools
import { useRef, useState } from "react"
import { useSimpleReducer } from "@/hooks"
import { RESTRICTIONS } from "./length_restrictions"
import { useDisableSubmission, useSavePartnerRequest } from "./hooks"
import { PARTNERSHIP_STATUSES, PARTNERSHIP_VARIANTS } from "@/data/partners"
import { convertCreatePartnerInterfaceToFormData } from "@/utils/convertCreatePartnerInterfaceToFormData"
// Types
import type { APIRequestParams } from "./@types"
import type { PartnerCompoundedData } from "./@types"
import type { SavePartner as SavePartnerInterface } from "@/@types/API"
// Components
import ImagePicker from "./ImagePicker"
import * as PartnerComponents from "@/components/partner"
import LengthIndicator from "@/components/templates/admin/LengthIndicator"
import { Box, Divider, Grid, Slider, Stack } from "@mui/material"
import { Breadcrumbs, Button, Input, LabeledFormField, Select } from "@/components/templates/admin"

interface SavePartnerViewProps {
    /** Small title applied to the current crumb of <Breadcrumbs/> component */
    breadcrumb: string

    /** Main header */
    title: string

    /** In case of updating a partner, this prop should contain the current state of the partner */
    initialData?: PartnerCompoundedData

    /** Form submitting button text */
    buttonPrompt: string

    apiRequest: APIRequestParams
}

const SavePartnerView: React.FunctionComponent<SavePartnerViewProps> = (props) => {
    // File input reference
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Image preview state
    const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(props.initialData?.logoUrl ?? null)

    // Partner data state
    const [state, update] = useSimpleReducer<Required<SavePartnerInterface>>(
        props.initialData?.details ?? {
            name: "",
            partnerType: "MEDIA_PATRONAGE",
            published: "FALSE",
            shortDescription: "",
            longDescription: "",
            websiteUrl: "",
            displayPriority: 0,
        }
    )

    // Use a custom hook to keep track of whether a main form submitting button should be disabled or not
    const disableSendFormButton: boolean = useDisableSubmission({
        state, //
        imagePreviewURL,
        initialData: props.initialData ?? null,
    })

    // Use a custom hook to organize API calling unit
    const performSavePartnerRequest = useSavePartnerRequest(props.apiRequest)

    async function handleFormSubmittingButtonOnClick() {
        await performSavePartnerRequest(
            convertCreatePartnerInterfaceToFormData(
                state, //
                fileInputRef
            )
        )
    }

    return (
        <>
            <Breadcrumbs
                current={props.breadcrumb} //
                crumbs={[{ name: "Partnerzy", path: "/admin/partners" }]}
            />

            <h1>{props.title}</h1>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={10}>
                <Grid item xs={7}>
                    <Stack spacing={2}>
                        <LabeledFormField
                            label="Nazwa: " //
                            control={
                                <LengthIndicator currentLength={state.name.length} {...RESTRICTIONS["name"]}>
                                    <Input
                                        value={state.name} //
                                        onChange={(e) => update({ name: e.target.value })}
                                        placeholder="Wpisz nazwę partnera"
                                        error={true}
                                    />
                                </LengthIndicator>
                            }
                        />

                        <LabeledFormField
                            label="Strona: " //
                            control={
                                <LengthIndicator currentLength={state.websiteUrl.length} {...RESTRICTIONS["websiteUrl"]}>
                                    <Input
                                        value={state.websiteUrl} //
                                        onChange={(e) => update({ websiteUrl: e.target.value })}
                                        placeholder="Wpisz adres strony internetowej partnera"
                                    />
                                </LengthIndicator>
                            }
                        />

                        <LabeledFormField
                            label="Priorytet: " //
                            control={
                                <div>
                                    <Slider
                                        value={state.displayPriority} //
                                        onChange={(e, value) => update({ displayPriority: value as number })}
                                        min={1}
                                        max={10}
                                        step={1}
                                        marks
                                        valueLabelDisplay="auto"
                                    />
                                    <span>Wybrany priorytet: </span>
                                    <strong>{state.displayPriority}</strong>
                                </div>
                            }
                        />

                        <LabeledFormField
                            label="Typ: " //
                            control={
                                <Select
                                    value={state.partnerType} //
                                    onChange={(e) => update({ partnerType: e.target.value })}
                                    options={PARTNERSHIP_VARIANTS}
                                />
                            }
                            extraContent={
                                <Box justifyContent="center" alignItems="center" width="96px" display="flex">
                                    <PartnerComponents.Type type={state.partnerType} />
                                </Box>
                            }
                        />

                        <LabeledFormField
                            label="Widoczność: " //
                            control={
                                <Select
                                    value={state.published} //
                                    onChange={(e) => update({ published: e.target.value })}
                                    options={PARTNERSHIP_STATUSES}
                                />
                            }
                            extraContent={
                                <Box justifyContent="center" alignItems="center" width="160px" display="flex">
                                    <PartnerComponents.Status isPublished={state.published === "TRUE"} />
                                </Box>
                            }
                        />

                        <LabeledFormField
                            label="Krótki opis: " //
                            control={
                                <LengthIndicator currentLength={state.shortDescription.length} {...RESTRICTIONS["shortDescription"]}>
                                    <Input
                                        value={state.shortDescription} //
                                        onChange={(e) => update({ shortDescription: e.target.value })}
                                        placeholder="Wpisz krótki opis partnera"
                                        multiline
                                        rows={2}
                                    />
                                </LengthIndicator>
                            }
                        />

                        <LabeledFormField
                            label="Długi opis:" //
                            control={
                                <LengthIndicator currentLength={state.longDescription.length} {...RESTRICTIONS["longDescription"]}>
                                    <Input
                                        value={state.longDescription} //
                                        onChange={(e) => update({ longDescription: e.target.value })}
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, odio et vestibulum lobortis, libero nunc tincidunt nisl, a lacinia libero nisl nec ligula. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi."
                                        multiline
                                        rows={4}
                                    />
                                </LengthIndicator>
                            }
                        />
                    </Stack>
                </Grid>

                <ImagePicker
                    ref={fileInputRef} //
                    imagePreviewURL={imagePreviewURL}
                    setImagePreviewURL={setImagePreviewURL}
                />
            </Grid>

            <Button
                sx={{ mt: 5 }} //
                variant="success"
                onClick={handleFormSubmittingButtonOnClick}
                disabled={disableSendFormButton}
            >
                {props.buttonPrompt}
            </Button>
        </>
    )
}

export default SavePartnerView
