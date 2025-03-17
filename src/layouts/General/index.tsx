import { Outlet } from "react-router"

import Footer from "@/components/footer/footer"
import LandingMenu from "@/components/landingMenu/LandingMenu"

const GeneralLayout: React.FunctionComponent = (props) => {
    return (
        <>
            <LandingMenu />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default GeneralLayout
