import { CompanyItemCreate } from "@/api"
import { Breadcrumbs, Button } from "@/components/templates/admin"
import { useDialog } from "@/contexts/Modals"
import { API } from "@/services"
import { Box, Divider, Grid, Paper, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

export default function AdminAddCompanyPage() {
    const { register, handleSubmit, reset } = useForm<CompanyItemCreate>()
    const showDialog = useDialog()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: CompanyItemCreate) => API.companies.create6(data).then((res) => res.data), //
        onError: (err) => {
            console.log(err)
        },
        onSuccess: async (data) => {
            await showDialog({ title: "Firma dodana", message: `Firma ${data.name} została dodana pomyślnie.` })
            reset()
            console.log("created company", data)
        },
    })

    function onSubmit(data: CompanyItemCreate) {
        mutate(data)
        console.log("submitted data", data)
    }

    return (
        <>
            <Breadcrumbs
                current="Dodaj firmę" //
                crumbs={[{ name: "Firmy", path: "/admin/companies" }]}
            />

            <Grid container spacing={2} p={2} justifyContent={"center"}>
                <Grid item width={"100%"} maxWidth={"70ch"}>
                    <Paper sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box display={"flex"} flexDirection={"column"} gap={2}>
                                <h1>Rejestracja nowej firmy</h1>
                                <Divider />

                                <h3>Dane firmy</h3>
                                <TextField label="Nazwa firmy" {...register("name", { required: true })} required />
                                <TextField label="Logo firmy (url)" {...register("logoUrl", { required: true })} required />
                                <TextField label="Strona internetowa firmy (url)" {...register("websiteUrl", { required: true })} required />
                                <TextField label="Priorytet wyświetlania" {...register("displayPriority")} />

                                <h3>Opisy</h3>
                                <TextField label="Opis firmy (krótki)" multiline {...register("shortDescription", { required: true })} required />
                                <TextField label="Opis firmy (długi)" multiline {...register("longDescription")} />
                                <Divider />

                                <Box display={"flex"}>
                                    <Button variant="transparent" type="reset" fullWidth>
                                        Wyczyść
                                    </Button>
                                    <Button type="submit" fullWidth disabled={isLoading}>
                                        Dodaj firmę
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
