import { CaseWeekOverview, CaseWeekPros } from "@/components/templates/sections"
import WelcomeSection from "@/components/pages/landing/homepage/WelcomeSection/WelcomeSection"
export default function HomePage() {
    return (
        <>
            <WelcomeSection />
            <CaseWeekOverview />
            <CaseWeekPros />
        </>
    )
}
