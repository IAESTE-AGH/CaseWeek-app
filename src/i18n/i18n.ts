import plNavbar from './navbar/pl.json';
import enNavbar from './navbar/en.json';
import plPartners from './partners/pl.json';
import enPartners from './partners/en.json';
import plHomepage from './homepage/pl.json';
import enHomepage from './homepage/en.json';
import plWorkshopsList from './workshopsList/pl.json';
import enWorkshopsList from './workshopsList/en.json';

type Translations = {
  [key: string]: any; 
};

type Locale = {
  [key: string]: Translations;
};

const translations: Locale = {
  pl: {
    ...plNavbar,
    ...plPartners,
    ...plHomepage,
    ...plWorkshopsList
  },
  en: {
    ...enNavbar,
    ...enPartners,
    ...enHomepage,
    ...enWorkshopsList
  }
};

let currentLanguage: 'pl' | 'en' = 'pl';

export const setLanguage = (language: 'pl' | 'en') => {
  currentLanguage = language;
};

export const t = (key: string) => {
  const keys = key.split('.');
  let result: any = translations[currentLanguage];

  for (const k of keys) {
    result = result[k];
    if (result === undefined) {
      return key;
    }
  }

  return result;
};