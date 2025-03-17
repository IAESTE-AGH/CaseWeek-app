import s from "./Overview.module.css"
import { t } from "../../../../../i18n/i18n"
import overviewImage from "@/assets/img/overview_1.png"
import overviewImage2 from "@/assets/img/overview_2.png"
import { NUMBERS } from "./Overview.const"
import cogwheelLightIcon from "@/assets/icons/cogwheel_light_icon.svg"
import clsx from "clsx"

const Overview = () => {
    return (
        <section className={s.overviewContainer}>
            <h1 className={s.overviewHeading}>
                <span className={s.headingAccent}>{t("homepage.overview.headingAccent")}</span> {t("homepage.overview.headingName")}
            </h1>
            <p className={clsx(s.overviewParagraph, s.paragraph1)}>{t("homepage.overview.paragraph1")}</p>
            <div className={s.overviewImage1}></div>
            <div className={clsx(s.numbersWrapper, s.workshopsNumberWrapper)}>
                <div className={s.number}>{NUMBERS.workshops}</div>
                <div className={s.numberLabel}>{t("homepage.overview.workshopsCounterLabel")}</div>
            </div>
            <div className={s.overviewImage2}></div>
            <div className={clsx(s.numbersWrapper, s.universitiesNumberWrapper)}>
                <div className={s.number}>{NUMBERS.universities}</div>
                <div className={s.numberLabel}>{t("homepage.overview.universitiesCounterLabel")}</div>
            </div>
            <p className={clsx(s.overviewParagraph, s.paragrahph2)}>{t("homepage.overview.paragraph2")}</p>
            <div className={s.numbersContainer}>
                <div className={s.numbersWrapper}>
                    <div className={s.number}>{NUMBERS.companies}</div>
                    <div className={s.numberLabel}>{t("homepage.overview.companiesCounterLabel")}</div>
                </div>
                <div className={s.numbersWrapper}>
                    <div className={s.number}>{NUMBERS.cities}</div>
                    <div className={s.numberLabel}>{t("homepage.overview.citiesCounterLabel")}</div>
                </div>
            </div>
            {/* <img src={cogwheelLightIcon} className={s.wheelImage} alt="cogwheel" /> */}
        </section>
    )
}

export default Overview
