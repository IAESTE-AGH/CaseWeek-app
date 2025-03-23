import { t } from "@/i18n/i18n"
import { TMenuOptions } from "./MenuOptionsList.type"

export const MENU_OPTIONS: TMenuOptions[] = [
    {
        label: t("menuOptions.aboutProject"),
        path: "/",
    },
    {
        label: t("menuOptions.aboutIaeste"),
        path: "https://www.iaeste.pl/",
    },
    {
        label: t("menuOptions.workshops"),
        path: "/warsztaty",
    },
    {
        label: t("menuOptions.partners"),
        path: "/partnerzy",
    },
    {
        label: t("menuOptions.companies"),
        path: "/firmy",
    },
]
