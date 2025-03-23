import s from "./Benefits.module.css"
import { t } from "../../../../../i18n/i18n"
import { Button } from "@/components/button"
import { BENEFITS } from "./Benefits.const"

const Benefits = () => {
    return (
        <section className={s.benefitsContainer}>
            <h2 className={s.benefitsHeading}>{t("homepage.benefits.benefitsHeading")}</h2>
            <ul className={s.benefitsCardList}>
                {BENEFITS.map((items) => (
                    <li className={s.benefitsListItem}>
                        <img src={items.icon} className={s.benefitIcon} />
                        <h4 className={s.benefitsItemHeading}>{items.title}</h4>
                        <p className={s.benefitsItemParagraph}>{items.description}</p>
                    </li>
                ))}
            </ul>
            <div className={s.buttonsWrapper}>
                <Button title={t("homepage.components.button")} />
            </div>
        </section>
    )
}

export default Benefits
