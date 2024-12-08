// Tools
import GeneralLayout from "./layouts/General"
import { createBrowserRouter } from "react-router-dom"

// TODO: Navbar components currently serves a purpose of JSX placeholder, so do not forget removing it
import Navbar from "./components/navbar/navbar"

import AdminRouteLayout from "@/layouts/AdminRouteLayout"

// 0. ADMIN | Main page
import AdminMainPage from "@/pages/admin"

// 1. ADMIN | User endpoints
import AdminUsersPage from "@/pages/admin/users/users"
import AdminSingleUserPage from "@/pages/admin/users/user"

// 2. ADMIN | Company endpoints
import AdminCompaniesPage from "./pages/admin/companies/companies"
import AdminSingleCompanyPage from "./pages/admin/companies/company"
import AdminAddCompanyPage from "./pages/admin/companies/addCompany"

// 3. ADMIN | Partners endpoints
import AdminPartnersPage from "./pages/admin/partners/partners"
import AdminAddPartner from "./pages/admin/partners/addPartner"
import AdminSinglePartnerPage from "./pages/admin/partners/partner"
import AdminUpdatePartner from "./pages/admin/partners/updatePartner"

// 4. ADMIN | Workshop endpoints
import AdminWorkshopsPage from "./pages/admin/workshops/workshops"
import AdminSingleWorkshopPage from "@/pages/admin/workshops/workshop"
import AdminUpdateWorkshopPage from "@/pages/admin/workshops/updateWorkshop"

// 5. MAIN | Home page
import HomePage from "@/pages/homePage"

// 6. MAIN | Workshops page
import WorkshopsPage from "@/pages/workshopsPage"
import WorkshopPage from "@/pages/workshopPage"

// 7. MAIN | Partners page
import PartnersPage from "@/pages/partnersPage";

// 8. MAIN | Companies page
import CompaniesPage from "@/pages/companiesPage"

// 9. MAIN | Login page
import LoginPage from "./pages/loginPage"

export const router = createBrowserRouter([
    {
        element: <GeneralLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/projekt", element: <Navbar /> },
            { path: "/iaeste", element: <Navbar /> },
            { path: "/warsztaty", element: <WorkshopsPage /> },
            { path: "/warsztaty/:id", element: <WorkshopPage />},
            { path: "/partnerzy", element: <PartnersPage /> },
            { path: "/firmy", element: <CompaniesPage /> },
            { path: "/kontakt", element: <Navbar /> },

            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <Navbar /> },
            { path: "/logout", element: <Navbar /> },
            { path: "/user", element: <Navbar /> },
            { path: "/user/warsztaty", element: <Navbar /> },
            {
                path: "/admin",
                element: <AdminRouteLayout />,
                children: [
                    { path: "/admin/", element: <AdminMainPage /> },
                    //
                    { path: "/admin/users", element: <AdminUsersPage /> },
                    { path: "/admin/user", element: <AdminSingleUserPage /> },
                    //
                    { path: "/admin/companies", element: <AdminCompaniesPage /> },
                    { path: "/admin/company/new", element: <AdminAddCompanyPage /> },
                    { path: "/admin/company", element: <AdminSingleCompanyPage /> },
                    //
                    { path: "/admin/workshops", element: <AdminWorkshopsPage /> },
                    { path: "/admin/workshop", element: <AdminSingleWorkshopPage /> },
                    { path: "/admin/workshop/update", element: <AdminUpdateWorkshopPage /> },
                    //
                    { path: "/admin/partners", element: <AdminPartnersPage /> },
                    { path: "/admin/partner/new", element: <AdminAddPartner /> },
                    { path: "/admin/partner/update", element: <AdminUpdatePartner /> },
                    { path: "/admin/partner", element: <AdminSinglePartnerPage /> },
                ],
            },
        ],
    },
])
