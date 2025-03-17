import React from 'react'
import { MOCK_COMPANIES } from '@/mocks/companies';
import PartnersCompanies from '@/components/pages/landing/partnersCompanies/partnersCompanies';


const companiesPage = () => {
  return (
    <PartnersCompanies companies={MOCK_COMPANIES} title="Firmy" />
  )
}

export default companiesPage