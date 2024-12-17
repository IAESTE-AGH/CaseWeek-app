import React from 'react'
//  import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
//import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './partnersPage.css'
import naTeraz from '../assets/img/temp.png';

import { MOCK_COMPANIES } from '../mocks/companies';

const PartnersPage: React.FC = () => {
  return (
    <div>
      <h1 className="title">PARTNERZY:</h1>
      <div className="partners-grid">
        {MOCK_COMPANIES.map((company) => (
          <div key={company.id} className="partner">
            <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
              <img src={naTeraz} alt={company.name} />
            </a>
            <p className="partner-name">{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default PartnersPage;


