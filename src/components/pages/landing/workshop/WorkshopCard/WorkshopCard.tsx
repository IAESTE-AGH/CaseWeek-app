import { useParams } from "react-router-dom"
import s from "./WorkshopCard.module.css"
import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { WORKSHOP_CARD_DATA } from "./WorkshopCard.const"
import { TWorkshopCard } from "./Workshop.type"
const WorkshopCard = () => {
    let { id: workshopId } = useParams()
    const workshop = WORKSHOPS_MOCKS.find((item) => item.id === workshopId) as TWorkshopCard

    const fieldsOfStudy = workshop?.preferableFieldsOfStudy.map((field) => field.name).join(", ")

    const resultArray = [workshop?.startsAt, workshop?.minYearOfStudy, `${workshop?.durationMinutes} min`, workshop?.maxYearOfStudy, workshop?.university.name, fieldsOfStudy, workshop?.address]
    return (
        <main className={s.workshopContainer}>
            {workshop ? (
                <>
                    <section className={s.workshopWrapper}>
                        <div className={s.hero}>
                            <h3>{workshop.title}</h3>
                            <img className={s.companyPicture} src={workshop.company.logoUrl} alt="" />
                            <h4>{workshop.company.name}</h4>
                        </div>
                    </section>
                    <section>
                        <article>
                            <p className={s.description}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita illo sit dicta? Veniam excepturi architecto itaque atque dicta, quas incidunt obcaecati nisi non
                                laboriosam voluptate minus ut odio autem. Voluptatibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, laudantium. Natus adipisci, repudiandae nostrum
                                iste beatae nemo quod commodi dolor autem molestiae rem quam, minus vero libero dolore tenetur voluptatum!
                            </p>
                            <h4>Company Description</h4>
                            <p className={s.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure placeat rerum similique, omnis fugit itaque voluptate at culpa expedita corrupti nihil, mollitia
                                eum labore quos dolores neque, dicta asperiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi ex error animi consectetur harum provident alias
                                assumenda, nesciunt repellat! Dolorem consectetur, delectus facere neque nesciunt suscipit! Exercitationem nobis ducimus veniam.
                            </p>
                        </article>
                        <article className={s.infoWrap}>
                            <ul className={s.infoColumn}>
                                {WORKSHOP_CARD_DATA.map((card, index) => (
                                    <li key={card.detalName} className={s.workshopInfo}>
                                        <div className={s.infoGrey}>
                                            {card.icon}
                                            <p>{card.detalName}</p>
                                        </div>
                                        <p>{resultArray[index]}</p>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>
                </>
            ) : (
                <p>Nie znaleziono warsztatu</p>
            )}
        </main>
    )
}

export default WorkshopCard
