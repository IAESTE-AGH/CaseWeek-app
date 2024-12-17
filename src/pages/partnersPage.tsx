import React from 'react'
import { MOCK_COMPANIES } from '@/mocks/companies';
import PartnersCompanies from '@/components/pages/landing/partnersCompanies/partnersCompanies';

const partnersPage = () => {
  return (
    <PartnersCompanies companies={MOCK_COMPANIES} title="PARTNERZY" />
  )
}

export default partnersPage