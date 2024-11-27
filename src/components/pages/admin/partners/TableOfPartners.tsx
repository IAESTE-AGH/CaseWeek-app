// Tools
import { $axios } from "@/services"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { useDialog } from "@/contexts/Modals"
import { useNavigate } from "react-router-dom"
// Types
import type { Partner } from "@/@types/API"
import type { FunctionComponent } from "react"
// Components
import Table from "@/components/templates/admin/Table"
import * as PartnerComponents from "@/components/partner"
// Material UI Icons
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded"

interface TableOfPartnersProps {
    data: Partner[]
    refetchPartners: () => void
}

const TableOfPartners: FunctionComponent<TableOfPartnersProps> = (props) => {
    const redirect = useNavigate()
    const displayConfirmationDialog = useDialog()

    const { mutateAsync: deletePartner } = useMutation({
        mutationKey: "delete-partner",
        mutationFn: (id: Partner["id"]) => {
            return $axios.delete(`/partners/${id}`)
        },
    })

    const { mutateAsync: togglePublishing } = useMutation({
        mutationKey: "toggle-publishing",
        mutationFn: (id: Partner["id"]) => {
            return $axios.patch(`/partners/${id}/toggle-visibility`)
        },
    })

    function handleEdit(row: Partner) {
        redirect(`/admin/partner/update?partnerId=${row.id}`)
    }

    async function handlePublishToggling(row: Partner) {
        try {
            // Send request to toggle is published status
            await togglePublishing(row.id)

            // Display success message
            toast.success(`Partner ${row.name} został ${row.published ? "ukryty" : "opublikowany"}`)

            props.refetchPartners()
        } catch (err) {
            toast.error("Wystąpił błąd podczas zmiany statusu partnera")
        }
    }

    /** Delete partner on click handler */
    async function handleDelete(row: Partner) {
        try {
            const userChoice: boolean = await displayConfirmationDialog({
                title: "Czy na pewno chcesz usunąć partnera?",
                okText: "Tak, usuń",
                cancelText: "Nie, anuluj",
                message: `Czy na pewno chcesz usunąć partnera "${row.name}"?`,
            })

            if (!userChoice) return

            // Send request to delete partner
            await deletePartner(row.id)

            // Display success message
            toast.success(`Partner ${row.name} został usunięty`)

            props.refetchPartners()
        } catch (err) {
            toast.error("Wystąpił błąd podczas usuwania partnera")
        }
    }

    return (
        <Table
            data={props.data} //
            columnsWidths={[24, 35, 9, 13, 19]}
            columns={[
                {
                    key: "logoUrl",
                    alias: "Logo",
                    center: true,
                    render: (row) => <PartnerComponents.Logo partner={row} height="40px" />,
                },
                {
                    key: "name",
                    alias: "Nazwa",
                    redirectToOnClick: (data) => `/admin/partner?partnerId=${data.id}`,
                },
                {
                    key: "displayPriority",
                    alias: "Priorytet",
                    center: true,
                },
                {
                    key: "partnerType",
                    alias: "Typ",
                    center: true,
                    render: (row) => <PartnerComponents.Type type={row.partnerType} />,
                },
                {
                    key: "published",
                    alias: "Status",
                    center: true,
                    render: (row) => <PartnerComponents.Status isPublished={row.published} />,
                },
            ]}
            rowActions={[
                {
                    name: "Edytuj",
                    icon: <EditNoteRoundedIcon />,
                    tooltip: "Przejdź do edycji partnera",
                    action: handleEdit,
                },
                {
                    name: ({ published }) => (published ? "Ukryj" : "Opublikuj"),
                    icon: ({ published }) => (published ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />),
                    tooltip: ({ published }) => `Kliknij, aby zmienić status na ${published ? "nieopublikowany" : "opublikowany"}`,
                    action: handlePublishToggling,
                },
                {
                    name: "Usuń",
                    icon: <DeleteOutlineRoundedIcon />,
                    redColor: true,
                    tooltip: "Usuń całkowicie partnera",
                    action: handleDelete,
                },
            ]}
        />
    )
}

export default TableOfPartners
