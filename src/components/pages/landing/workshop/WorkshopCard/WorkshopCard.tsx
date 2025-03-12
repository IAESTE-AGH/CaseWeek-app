import { useParams } from "react-router-dom"
import s from "./WorkshopCard.module.css"
import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { WORKSHOP_CARD_DATA } from "./WorkshopCard.const"
import { TWorkshopCard } from "./Workshop.type"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const WorkshopPreviewCard = () => {}

const WorkshopCard = () => {
    let { id: workshopId } = useParams()
    const workshop = WORKSHOPS_MOCKS.find((item) => item.id === workshopId) as TWorkshopCard

    const fieldsOfStudy = workshop?.preferableFieldsOfStudy.map((field) => field.name).join(", ")

    const skillsArray = ["Pierwsza umiejętnośc", "druga umiejetnosc", "trzecia umiejetnosc", "czwarta umiejetnosc"]

    const resultArray = [workshop?.university.name, workshop?.startsAt, `${workshop?.durationMinutes} min`, workshop?.address, "", workshop?.minYearOfStudy, workshop?.maxYearOfStudy, fieldsOfStudy]

    const propositions = workshop?.propositions?.id

    return (
        <main className={s.workshopContainer}>
            {workshop ? (
                <>
                    <h1>{workshop.title}</h1>
                    <h4 className={s.companyName}>{workshop.company.name}</h4>
                    <section className={s.workshopSectionWrapper}>
                        <article className={s.workshopWrapper}>
                            <img className={s.companyPicture} src={workshop.company.logoUrl} alt="" />

                            <ul className={s.infoColumn}>
                                {WORKSHOP_CARD_DATA.map((card, index) => (
                                    <li key={card.detalName} className={s.workshopInfo}>
                                        <div className={s.infoGrey}>
                                            {card.icon}
                                            <p>
                                                {`${card.detalName} `}
                                                <strong>{resultArray[index]}</strong>
                                            </p>
                                        </div>
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
                                <h4 className={s.skillHeading}>Czego sie nauczysz</h4>
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
                                assumenda, nesciunt repellat! Dolorem consectetur, delectus facere neque nesciunt suscipit! Exercitationem nobis ducimus veniam. Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Autem molestiae sed impedit, aut dolor reprehenderit incidunt ipsa enim quas atque reiciendis placeat, velit dolorum ut voluptate. Eius amet
                                repudiandae commodi! Esse quaerat quidem porro suscipit provident sequi adipisci, praesentium ab amet aut voluptatibus consequuntur quisquam nesciunt vitae ut explicabo
                                dolor dolorem modi at velit incidunt reiciendis ipsum? Ullam, laborum ad! Delectus, exercitationem quia, qui quae eos repellat accusantium eius consequatur reiciendis
                                vero tenetur rem deserunt eum aliquam. Possimus necessitatibus consectetur excepturi animi quod, autem dolorum quos nesciunt ipsam est natus?
                            </p>
                            <div className={`${s.workshopSignUp} ${s.desktop}`}>
                                <button className={s.signUpBtn}>Zapisz się na warsztat</button>
                                <p className={s.registrationDate}>Rejestracja trwa do: 'data'</p>
                            </div>
                        </article>
                        <div className={`${s.underline} ${s.desktop}`}></div>
                    </section>
                    <div className={`${s.workshopSignUp} ${s.mobile}`}>
                        <button className={s.signUpBtn}>Zapisz się na warsztat</button>
                        <p className={s.registrationDate}>Rejestracja trwa do: 'data'</p>
                        <div className={`${s.underline} ${s.mobile}`}></div>
                    </div>

                    <section className={s.otherWorkshopsWrap}>
                        <h2>Mogą cię też zainteresować: </h2>
                        <article className={s.otherWorkshopSection}>
                            {propositions?.map((workshopPreview) => {
                                const workshopPrev = WORKSHOPS_MOCKS.find((item) => item.id === workshopPreview)

                                return workshopPrev ? (
                                    <div className={s.workshopPreview} key={workshopPrev.id}>
                                        <img src="" alt="" className={s.companyPicturePreview} />
                                        <div className={s.workshopInfoPreview}>
                                            <p className={`${s.infoGrey} ${s.infoPreview}`}>{`${workshopPrev.startsAt} ${workshopPrev.university.name}`}</p>
                                            <h3 className={s.workshopTitlePreview}>{workshopPrev.title}</h3>
                                            <h5 className={s.companyNamePreview}>{workshopPrev.company.name}</h5>
                                            <div className={s.badgesWrap}>
                                                <div className={s.badge}>krotki</div>
                                                <div className={s.badge}>dluszczy badge</div>
                                                <div className={s.badge}>krotki</div>
                                                <div className={s.badge}>dluzszy badge</div>
                                                <div className={s.badge}>krotki</div>
                                            </div>
                                            <div className={s.workshopActionBtn}>
                                                <ArrowForwardIcon sx={{ fontSize: 20 }} className={s.arrowIcon} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Nie znaleziono warsztatu</p>
                                )
                            })}
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
