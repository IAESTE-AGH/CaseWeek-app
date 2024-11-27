// Tools
import { $axios } from "@/services"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { useNavigate } from "react-router"
// Types
import type { PartnerItem } from "@/api"
import type { AxiosResponse } from "axios"
import type { Partner } from "@/@types/API"
import type { APIRequestParams } from "../@types"

type SavePartnerRequestMaker = (data: FormData) => Promise<AxiosResponse<PartnerItem>>

export function useSavePartnerRequest(params: APIRequestParams): SavePartnerRequestMaker {
    // On partner being created, redirect to the partner details page using this hook
    const navigate = useNavigate()

    // TODO: Ensure this works well
    const { mutateAsync: sendRequest } = useMutation({
        mutationKey: [params.mutationKey],
        mutationFn: async (data: FormData) => {
            return await $axios({
                data,
                method: params.method,
                url: params.url,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        },
        onSuccess: (data: AxiosResponse<Partner>) => {
            navigate(`/admin/partner?partnerId=${data.data.id}`)
            toast.success(params.successMessage)
        },
        onError: (error: any) => {
            console.log(error)
            const errorMessage: string | null = error?.response?.data?.message
            if (errorMessage) toast.error(errorMessage)
        },
    })

    return sendRequest
}
