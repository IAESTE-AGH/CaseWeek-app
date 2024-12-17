import React from 'react'
//  import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
//import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Company } from "@/@types/API";

import styles from './partnersCompanies.module.css';
import naTeraz from '@/assets/img/temp.png';




interface PartnersPageProps {
  companies: Company[];
  title: string;

}

const PartnersCompanies: React.FC<PartnersPageProps> = ({ companies, title }) => {
  return (
    <section>
      <h1 className={styles.title}>{title}:</h1>
      <ul className={styles.partnersGrid}>
        {companies.map((company) => (
          <li key={company.id} className={styles.partner}>
            <div className={styles.partnerWrapper}>
              <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
                <img src={naTeraz} alt={company.name} />
              </a>
              <p className={styles.partnerName}>{company.name}</p>
              <p className={styles.partnerStatus}>Honorary status</p>   {/* tymczosowo poki nie ma w bazie tego statusu hardcodem jest */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PartnersCompanies;
