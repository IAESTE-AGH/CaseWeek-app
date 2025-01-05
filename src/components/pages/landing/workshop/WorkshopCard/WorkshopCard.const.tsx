import TimelapseIcon from "@mui/icons-material/Timelapse"
import AlarmIcon from "@mui/icons-material/Alarm"
import SchoolIcon from "@mui/icons-material/School"
import PlaceIcon from "@mui/icons-material/Place"
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags"
import s from "./WorkshopCard.module.css"

export const WORKSHOP_CARD_DATA = [
    { icon: <AlarmIcon className={s.icons}/>, detalName: "Data i godzina" },
    { icon: <EmojiFlagsIcon className={s.icons}/>, detalName: "Minimalny rok studiów" },
    { icon: <TimelapseIcon className={s.icons}/>, detalName: "Czas trwania" },
    { icon: <EmojiFlagsIcon className={s.icons}/>, detalName: "Maksymalny rok studiów" },
    { icon: <SchoolIcon className={s.icons}/>, detalName: "Uczelnia" },
    { icon: <EmojiFlagsIcon className={s.icons}/>, detalName: "Kierunek studiów" },
    { icon: <PlaceIcon className={s.icons}/>, detalName: "Miejsce warsztatu" },
]
