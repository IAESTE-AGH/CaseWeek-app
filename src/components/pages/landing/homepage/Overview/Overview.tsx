import s from "./Overview.module.css"
import { t } from "../../../../../i18n/i18n"
import overviewImage from "@/assets/img/overview_1.png"
import overviewImage2 from "@/assets/img/overview_2.png"
import { NUMBERS } from "./Overview.const"
import cogwheelLightIcon from "@/assets/icons/cogwheel_light_icon.svg"

const Overview = () => {
    return (
        <section className={s.overviewContainer}>
            <h1 className={s.overviewHeading}>
                <span className={s.headingAccent}>{t("homepage.overview.headingAccent")}</span> {t("homepage.overview.headingName")}
            </h1>
            <div className={s.textImageWrapper}>
                <div className={s.overviewImage1}></div>
                <div className={s.overviewTextWrapper}>
                    <h3 className={s.overviewH3}>{t("homepage.overview.headingWhatIs")}</h3>
                    <p className={s.overviewParagraph}>{t("homepage.overview.paragraph1")}</p>
                    {/* <div className={s.numbersContainer}>
                        <div className={s.numbersWrapper}>
                            <div className={s.number}>{NUMBERS.workshops}</div>
                            <div className={s.numberLabel}>{t("homepage.overview.workshopsCounterLabel")}</div>
                        </div>
                        <div className={s.numbersWrapper}>
                            <div className={s.number}>{NUMBERS.universities}</div>
                            <div className={s.numberLabel}>{t("homepage.overview.universitiesCounterLabel")}</div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className={s.textImageWrapper}>
                <div className={s.overviewImage2}></div>
                <div className={s.overviewTextWrapper}>
                    <h3 className={s.overviewH3}>{t("homepage.overview.headingAbout")}</h3>
                    <p className={s.overviewParagraph}>{t("homepage.overview.paragraph2")}</p>
                    {/* <div className={s.numbersContainer}>
                        <div className={s.numbersWrapper}>
                            <div className={s.number}>{NUMBERS.companies}</div>
                            <div className={s.numberLabel}>{t("homepage.overview.companiesCounterLabel")}</div>
                        </div>
                        <div className={s.numbersWrapper}>
                            <div className={s.number}>{NUMBERS.cities}</div>
                            <div className={s.numberLabel}>{t("homepage.overview.citiesCounterLabel")}</div>
                        </div>
                    </div> */}
                </div>
            </div>
            <img src={cogwheelLightIcon} className={s.wheelImage} alt="cogwheel" />
        </section>
    )
}

export default Overview
