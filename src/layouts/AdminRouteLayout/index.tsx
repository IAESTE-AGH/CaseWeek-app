// Tools
import { styled } from "@mui/material"
// Other components
import { Outlet } from "react-router"

// Styled components
const AdminRouteLayoutBase = styled("section")(({ theme }) => ({
    // minHeight: "calc(100vh - 105px - 200px)",
    padding: "32px 16px",
    maxWidth: "1440px",
    margin: "0 auto",
}))

const AdminRouteLayout: React.FunctionComponent = () => {
    return (
        <AdminRouteLayoutBase>
            <Outlet />
            {/*  */}
        </AdminRouteLayoutBase>
    )
}

export default AdminRouteLayout
