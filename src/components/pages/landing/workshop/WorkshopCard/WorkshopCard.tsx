import { useParams } from "react-router-dom"
import s from "./WorkshopCard.module.css"
import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { WORKSHOP_CARD_DATA } from "./WorkshopCard.const"
import { TWorkshopCard } from "./Workshop.type"
const WorkshopCard = () => {
    let { id: workshopId } = useParams()
    const workshop = WORKSHOPS_MOCKS.find((item) => item.id === workshopId) as TWorkshopCard

    const fieldsOfStudy = workshop?.preferableFieldsOfStudy.map((field) => field.name).join(", ")

    const skillsArray = ["Pierwsza umiejętnośc", "druga umiejetnosc", "trzecia umiejetnosc", "czwarta umiejetnosc"]

    const resultArray = [workshop?.university.name, workshop?.startsAt, `${workshop?.durationMinutes} min`, workshop?.address, "", workshop?.minYearOfStudy, workshop?.maxYearOfStudy, fieldsOfStudy]
    return (
        <main className={s.workshopContainer}>
            {workshop ? (
                <>
                    <h1>{workshop.title}</h1>
                    <section className={s.workshopSectionWrapper}>
                        <article className={s.workshopWrapper}>
                            <div className={s.hero}>
                                <img className={s.companyPicture} src={workshop.company.logoUrl} alt="" />
                                <h4>{workshop.company.name}</h4>
                            </div>
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
                        <article className={s.workshopcDescriptionWrap}>
                            <h4>Opis warsztatu</h4>
                            <p className={s.description}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita illo sit dicta? Veniam excepturi architecto itaque atque dicta, quas incidunt obcaecati nisi non
                                laboriosam voluptate minus ut odio autem. Voluptatibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, laudantium. Natus adipisci, repudiandae nostrum
                                iste beatae nemo quod commodi dolor autem molestiae rem quam, minus vero libero dolore tenetur voluptatum!
                            </p>
                            <div className={s.skillsWrap}>
                                <h4>Czego sie nauczysz</h4>
                                <div className={s.skillList}>
                                    {skillsArray.map((skill) => (
                                        <div className={s.workshopSkill}>{skill}</div>
                                    ))}
                                </div>
                            </div>
                            <h4>Company Description</h4>
                            <p className={s.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure placeat rerum similique, omnis fugit itaque voluptate at culpa expedita corrupti nihil, mollitia
                                eum labore quos dolores neque, dicta asperiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi ex error animi consectetur harum provident alias
                                assumenda, nesciunt repellat! Dolorem consectetur, delectus facere neque nesciunt suscipit! Exercitationem nobis ducimus veniam.
                            </p>    
                            <div className={s.workshopSignUp}>
                                <button className={s.signUpBtn}>Zapisz się na warsztat</button>
                                <p className={s.registrationDate}>Rejestracja trwa do: 'data'</p>
                            </div>
                        </article>
                        <div className={s.underline}></div>
                    </section>
                    
                    <section className={s.otherWorkshopsWrap}>
                        <h1>Mogą cię też zainteresować: </h1>
                    </section>
                </>
            ) : (
                <p>Nie znaleziono warsztatu</p>
            )}
        </main>
    )
}

export default WorkshopCard
