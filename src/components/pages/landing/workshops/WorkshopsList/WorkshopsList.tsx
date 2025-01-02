import { WORKSHOPS_MOCKS } from "@/mocks/workshops"
import { Link } from "react-router-dom"
import { useState } from "react";
import s from "./WorkshopsList.module.css"

const WorkshopsList = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedField, setSelectedField] = useState("");

  // Pobieranie unikalnych uczelni
  const universities = [
    ...new Set(WORKSHOPS_MOCKS.map((workshop) => workshop.university.name)),
  ];

  // Pobieranie unikalnych kierunków studiów
  const fields = [
    ...new Set(
      WORKSHOPS_MOCKS.flatMap((workshop) =>
        workshop.preferableFieldsOfStudy.map((field) => field.name)
      )
    ),
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
      <h1 className={s.siteTitle}>Warsztaty:</h1>

      <div className={s.filters}>
          <li className={s.individualFilter}>
            <label htmlFor="university">Uczelnia:</label>
            <select
              id="university"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className={s.filterSelect}
            >
              <option value="">Wszystkie</option>
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}  
                </option>
              ))}
            </select>
          </li>
            
          <li className={s.individualFilter}>
            <label htmlFor="field">Kierunek studiów:</label>
            <select
              id="field"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className={s.filterSelect}
            >
              <option value="">Wszystkie</option>
              {fields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </li>
        </div>

      <ul className={s.workshopsList}>
        {filteredWorkshops.map((workshop) => ( //outputs every workshop that fits in filters  
              <li key ={workshop.id} className={s.card}>
                  <div>
                    <img 
                      //src={workshop.company.logoUrl} //not working unfortunately 
                      src="https://via.placeholder.com/150"
                      alt="Workshop" //just in case 
                      className={s.image}
                    />
                    <p className={s.company}>{workshop.company.name}</p>
                  </div>
                  <div>
                    <Link to={workshop.id ? `/warsztaty/${workshop.id}` : "/warsztaty"} className={s.workshopLink}>
                      <h2>{workshop.title}</h2>
                    </Link>
                    <p className={s.description}>{workshop.shortDescription}</p>
                    
                    <ul className={s.details}>
                      <li className={s.details_li}>📅 Data i godzina: {workshop.startsAt}</li>
                      <li className={s.details_li}>⏱ Czas trwania: {workshop.durationMinutes}</li>
                      <li className={s.details_li}>🏫 Uczelnia: {workshop.university.name}</li>
                    </ul>
                  </div>
              </li>
          ))}
      </ul>
    </section>
  );
  
};

export default WorkshopsList
