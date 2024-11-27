import { Outlet } from "react-router"

import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"

const GeneralLayout: React.FunctionComponent = (props) => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default GeneralLayout
