import { CaseWeekPros } from "@/components/templates/sections"
import WelcomeSection from "@/components/pages/landing/homepage/WelcomeSection/WelcomeSection"
import Overview from "@/components/pages/landing/homepage/Overview/Overview"
export default function HomePage() {
    return (
        <>
            <WelcomeSection />
            <Overview />
            <CaseWeekPros />
        </>
    )
}
