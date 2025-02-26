import { WORKSHOPS_MOCKS } from "@/mocks/workshops";
import { Link } from "react-router-dom";
import { useState } from "react";
import s from "./WorkshopsList.module.css";
import { t } from "@/i18n/i18n";

const WorkshopsList = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const universities = [
    ...new Set(WORKSHOPS_MOCKS.map((workshop) => workshop.university.name))
  ];

  const fields = [
    ...new Set(
      WORKSHOPS_MOCKS.flatMap((workshop) =>
        workshop.preferableFieldsOfStudy.map((field) => field.name)
      )
    )
  ];

  const filteredWorkshops = WORKSHOPS_MOCKS.filter((workshop) => {
    const matchesUniversity =
      !selectedUniversity || workshop.university.name === selectedUniversity;
    const matchesField =
      !selectedField ||
      workshop.preferableFieldsOfStudy.some(
        (field) => field.name === selectedField
      );

    return matchesUniversity && matchesField;
  });

  return (
    <section className={s.all}>
      <h1 className={s.siteTitle}>{t("workshopsList.title")}</h1> 

      <div className={s.filters}>
        <li className={s.individualFilter}>
          <label htmlFor="university">{t("workshopsList.universityLabel")}</label> 
          <select
            name="filterNo1"
            id="university"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className={s.filterSelect}
          >
            <option value="">{t("workshopsList.allLabel")}</option> 
            {universities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
        </li>

        <li className={s.individualFilter}>
          <label htmlFor="field">{t("workshopsList.fieldLabel")}</label> 
          <select
            name="filterNo2"
            id="field"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className={s.filterSelect}
          >
            <option value="">{t("workshopsList.allLabel")}</option> {/* "all_label" */}
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </li>
      </div>

      <ul className={s.workshopsListContainer}>
        {filteredWorkshops.map((workshop) => (
          <li key={workshop.id} className={s.card}>
            <div>
              <img
                // src={workshop.company.logoUrl} // ewentualnie w przyszłości
                src="https://via.placeholder.com/150"
                alt="Workshop"
                className={s.image}
              />
              <p className={s.company}>{workshop.company.name}</p>
            </div>
            <div>
              <Link
                to={workshop.id ? `/warsztaty/${workshop.id}` : "/warsztaty"}
                className={s.workshopLink}
              >
                <h2>{workshop.title}</h2>
              </Link>
              <p className={s.description}>{workshop.shortDescription}</p>

              <ul className={s.details}>
                <li className={s.detailsLi}>
                  📅 {t("workshopsList.dateLabel")} {workshop.startsAt} 
                </li>
                <li className={s.detailsLi}>
                  ⏱ {t("workshopsList.durationLabel")} {workshop.durationMinutes} 
                </li>
                <li className={s.detailsLi}>
                  🏫 {t("workshopsList.universityColonLabel")} {workshop.university.name} 
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkshopsList;