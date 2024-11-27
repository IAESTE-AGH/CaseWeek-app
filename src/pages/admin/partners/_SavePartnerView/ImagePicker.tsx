// Tools
import { forwardRef } from "react"
// Types
import type { Dispatch, MutableRefObject, SetStateAction } from "react"
// Components
import { Grid, Skeleton } from "@mui/material"
import Button from "@/components/templates/admin/Button"

type ImagePreviewValue = string | null

interface ImagePickerProps {
    imagePreviewURL: ImagePreviewValue
    setImagePreviewURL: Dispatch<SetStateAction<ImagePreviewValue>>
}

const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>((props, ref) => {
    const { imagePreviewURL, setImagePreviewURL } = props

    // Update image preview on file input change
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviewURL(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // TODO: implemnet this

    // Handles the representative button on click behaviour
    function buttonOnClick() {
        if (ref === null) {
            throw new Error("ImagePicker ref it's required!")
        }

        ;(ref as unknown as MutableRefObject<HTMLInputElement>).current?.click()
    }

    return (
        <Grid item xs={5}>
            <input
                ref={ref} //
                type="file"
                accept="image/*"
                id="logo"
                style={{ display: "none" }}
                onChange={onInputChange}
            />

            {(() => {
                if (imagePreviewURL) {
                    return (
                        <img
                            src={imagePreviewURL} //
                            alt="Podgląd logo"
                            style={{ height: "480px", width: "100%", objectFit: "contain" }}
                        />
                    )
                } else {
                    return <Skeleton variant="rectangular" height="480px" sx={{ mb: 2 }} />
                }
            })()}

            <Button onClick={buttonOnClick}>{imagePreviewURL ? "Zmień zdjęcie" : "Wybierz zdjęcie"}</Button>
        </Grid>
    )
})

export default ImagePicker
