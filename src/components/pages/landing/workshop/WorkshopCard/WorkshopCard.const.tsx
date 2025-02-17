import TimelapseIcon from "@mui/icons-material/Timelapse"
import AlarmIcon from "@mui/icons-material/Alarm"
import SchoolIcon from "@mui/icons-material/School"
import PlaceIcon from "@mui/icons-material/Place"
import ListAltIcon from '@mui/icons-material/ListAlt';
import s from "./WorkshopCard.module.css"

export const WORKSHOP_CARD_DATA = [
    { icon: <SchoolIcon className={s.icons} />, detalName: "Uczelnia" },
    { icon: <AlarmIcon className={s.icons} />, detalName: "Data i godzina" },
    { icon: <TimelapseIcon className={s.icons} />, detalName: "Czas trwania" },
    { icon: <PlaceIcon className={s.icons} />, detalName: "Miejsce warsztatu" },
    { icon: <ListAltIcon className={s.icons} />, detalName: "Wymagania:" }, // Nagłówek dla sekcji wymagań
    { icon: "", detalName: "Minimalny rok studiów" },
    { icon: "", detalName: "Maksymalny rok studiów" },
    { icon: "", detalName: "Kierunek studiów" },
]
