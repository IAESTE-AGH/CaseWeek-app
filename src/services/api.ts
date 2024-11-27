import { $axios } from "./axios"

import {
    UsersApi, //
    PartnersApi,
    WorkshopsApi,
    CompaniesApi,
    LanguagesApi,
    UniversitiesApi,
    FieldOfStudiesApi,
} from "../api/api"

import type { AxiosInstance } from "axios"

// Define the API config type
type ApiConfig = [undefined, string, AxiosInstance]

// Since we are using an identical config for all APIs, we can define it once and reuse it later on
const config: ApiConfig = [undefined, $axios.defaults.baseURL as string, $axios]

// Define the API object
export const API = {
    users: new UsersApi(...config),
    partners: new PartnersApi(...config),
    workshops: new WorkshopsApi(...config),
    companies: new CompaniesApi(...config),
    languages: new LanguagesApi(...config),
    universities: new UniversitiesApi(...config),
    fieldOfStudies: new FieldOfStudiesApi(...config),
}
