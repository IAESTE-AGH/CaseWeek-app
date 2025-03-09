import { NavLink } from "react-router-dom"
import { MENU_OPTIONS } from "./MenuOptionsList.const"
import s from "./MenuOptionsList.module.css"
import CloseIcon from "@mui/icons-material/Close"

type MenuOptionsListProps = {
    onClose?: () => void
    isInDrawer?: boolean
}

const MenuOptionsList = ({ onClose, isInDrawer = false }: MenuOptionsListProps) => {
    return (
        <ul className={s.optionsList}>
            {isInDrawer && (
                <li className={s.menuHeaderWrapper}>
                    <p className={s.menuLabel}>Menu</p>
                    <CloseIcon className={s.closeIcon} fontSize="large" onClick={onClose} />
                </li>
            )}
            {MENU_OPTIONS.map((options) => (
                <li>
                    <NavLink to={options.path} onClick={onClose} className={({ isActive }) => `${s.optionLink} ${isActive ? s.activeLink : ""}`}>
                        {options.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default MenuOptionsList
