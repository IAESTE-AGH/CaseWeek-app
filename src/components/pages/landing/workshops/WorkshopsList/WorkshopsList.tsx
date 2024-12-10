import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { Link } from "react-router-dom"
import s from "./WorkshopsList.module.css"

const WorkshopsList = () => {
  return (
    <ul className={s.workshopsList}>
        {WORKSHOPS_MOCKS.map(workshop => (
            <Link to={workshop.id ? `/warsztaty/${workshop.id}` : "/warsztaty"} className={s.workshopLink}>
            <li>
                <h1>Nazwa wrsztatu: {workshop.title}</h1>
                <p>Przykładowa zmiana</p> 
            </li>
        </Link>

        ))}
    </ul>
  )
}

export default WorkshopsList
