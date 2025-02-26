import React from 'react';
import { Company } from "@/@types/API";
import styles from './partnersCompanies.module.css';
import naTeraz from '@/assets/img/temp.png';
import temporaryCompaniesLogo from '@/assets/img/PSRP_logo.png';
import { PartnersPageProps } from './partnersCompanies.type';
import { t } from '@/i18n/i18n'; 

const PartnersCompanies: React.FC<PartnersPageProps> = ({ companies, title }) => {
  return (
    <section className={styles.partnersSection}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.partnersGrid}>
        {companies.map((company) => (
          <li key={company.id} className={styles.partner}>
            <div className={styles.partnerWrapper}>
              <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
                <img src={temporaryCompaniesLogo} alt={company.name} />
              </a>            
             {/*  <p className={styles.partnerStatus}>{t("partners.honoraryStatus")}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PartnersCompanies;