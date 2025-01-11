type Translations = {
  [key: string]: string;
};

type Locale = {
  [key: string]: Translations;
};

const translations: Locale = {
  pl: {
    "O Projekcie": "O Projekcie",
    "O IAESTE": "O IAESTE",
    "Warsztaty": "Warsztaty",
    "Partnerzy": "Partnerzy",
    "Firmy": "Firmy",
    "Kontakt": "Kontakt",
    "Moje konto": "Moje konto",
    "Moje warsztaty": "Moje warsztaty",
    "Panel administracyjny": "Panel administracyjny",
    "Wyloguj się": "Wyloguj się",
    "Zaloguj się": "Zaloguj się",
    "Menu": "Menu",
    "Honorary Status": "Status Honorowy"
  },
  en: {
    "O Projekcie": "About the Project",
    "O IAESTE": "About IAESTE",
    "Warsztaty": "Workshops",
    "Partnerzy": "Partners",
    "Firmy": "Companies",
    "Kontakt": "Contact",
    "Moje konto": "My Account",
    "Moje warsztaty": "My Workshops",
    "Panel administracyjny": "Admin Panel",
    "Wyloguj się": "Log Out",
    "Zaloguj się": "Log In",
    "Menu": "Menu",
    "Honorary Status": "Honorary Status"
  }
};

let currentLanguage: 'pl' | 'en' = 'pl';

export const setLanguage = (language: 'pl' | 'en') => {
  currentLanguage = language;
};

export const t = (key: string) => {
  return translations[currentLanguage][key] || key;
};