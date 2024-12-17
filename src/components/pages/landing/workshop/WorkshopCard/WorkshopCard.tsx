import { useParams } from "react-router-dom"
import s from "./WorkshopCard.module.css"
import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { WorkshopItem } from "@/api"
import TimelapseIcon from "@mui/icons-material/Timelapse"
import AlarmIcon from "@mui/icons-material/Alarm"
import SchoolIcon from "@mui/icons-material/School"
import PlaceIcon from "@mui/icons-material/Place"
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags"
const WorkshopCard = () => {
    let { id: workshopId } = useParams()

    const workshop: WorkshopItem = WORKSHOPS_MOCKS.filter((item) => item.id === workshopId)[0]
    return (
        <main className={s.mWrap}>
            <section className={s.sWrap}>
                <div className={s.hero}>
                    <h3>{workshop.title}</h3>
                    <img className= {s.temp} src={workshop.company.logoUrl} alt="" />
                    <h4>{workshop.company.name}</h4>
                </div>
            </section>
            <section>
                <div>
                    <p className={s.description}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita illo sit dicta? Veniam excepturi architecto itaque atque dicta, quas incidunt obcaecati nisi non laboriosam
                        voluptate minus ut odio autem. Voluptatibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, laudantium. Natus adipisci, repudiandae nostrum iste beatae nemo
                        quod commodi dolor autem molestiae rem quam, minus vero libero dolore tenetur voluptatum!
                    </p>
                    <h4>Company Description</h4>
                    <p className={s.description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure placeat rerum similique, omnis fugit itaque voluptate at culpa expedita corrupti nihil, mollitia eum
                        labore quos dolores neque, dicta asperiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi ex error animi consectetur harum provident alias assumenda,
                        nesciunt repellat! Dolorem consectetur, delectus facere neque nesciunt suscipit! Exercitationem nobis ducimus veniam.
                    </p>
                </div>
                <div className={s.infoWrap}>
                    <div className={s.infoColumn}>
                        <div className={s.info}>
                            <span className={s.span}>
                                <AlarmIcon className={s.icons} />
                                Data i godzina
                            </span>
                            {workshop.startsAt}
                        </div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <TimelapseIcon className={s.icons} />
                                Czas trwania
                            </span>
                            {workshop.durationMinutes} min
                        </div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <SchoolIcon className={s.icons} />
                                Uczelnia
                            </span>
                            {workshop.university.name}
                        </div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <PlaceIcon className={s.icons} />
                                Miejsce warsztatu
                            </span>
                            {workshop.address}
                        </div>
                    </div>
                    <div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <EmojiFlagsIcon className={s.icons} />
                                Minimalny rok studiów
                            </span>
                            {workshop.minYearOfStudy}
                        </div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <EmojiFlagsIcon className={s.icons} />
                                Maksymalny rok studiów
                            </span>
                            {workshop.maxYearOfStudy}
                        </div>
                        <div className={s.info}>
                            <span className={s.span}>
                                <EmojiFlagsIcon className={s.icons} />
                                Kierunek studiów
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default WorkshopCard
