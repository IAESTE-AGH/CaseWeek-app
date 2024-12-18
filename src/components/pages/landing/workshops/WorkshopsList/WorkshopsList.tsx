import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { Link } from "react-router-dom"
import s from "./WorkshopsList.module.css"

const WorkshopsList = () => {
  
  return (
    <section>
    <h1 className={s.site_title}>Warsztaty:</h1>
    <ul className={s.workshopsList}>
        {WORKSHOPS_MOCKS.map(workshop => ( //goes through every workshop listed in workshops_mocks 
            <li>
              <article className={s.card}>
                <ul>
                  <img 
                    //src={workshop.company.logoUrl} //not working unfortunately 
                    src="https://via.placeholder.com/150"
                    alt="Workshop" //just in case 
                    className={s.image}
                  />
                  <p className={s.company}>{workshop.company.name}</p>
                </ul>
                <div>
                  <Link to={workshop.id ? `/warsztaty/${workshop.id}` : "/warsztaty"} className={s.workshopLink}>
                    <h2>{workshop.title}</h2>
                  </Link>
                  <p className={s.description}>{workshop.shortDescription}</p>
                  
                  <ul className={s.details}>
                    <li className={s.details_li}>📅 Data i godzina: {workshop.startsAt}</li>
                    <li className={s.details_li}>⏱ Czas trwania: {workshop.durationMinutes}</li>
                    <li className={s.details_li}>🏫 Uczelnia: {workshop.university.name}</li>
                  </ul>
                </div>

              </article>
            </li>
        ))}
    </ul>
    </section>
  )
  
}

export default WorkshopsList
