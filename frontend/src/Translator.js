import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//Contains the list of translations of Cezch and English languages

const resources = {
  en: {
    translation: {
      loading: "Loading",
      login: "Login",
      register: "Sign up",
      authors: "Authors",
      categories: "Categories",
      title: "Title",
      catalog: "Catalog",
      published_year: "Published year",
      average_rating: "Average rating",
      num_pages: "Number of pages",
      ratings_count: "Ratings count",
      description: "Description",
      username: "Username",
      password: "Password",
      logout: "Logout",
      cancel: "Cancel"
    }
  },
  cs: {
    translation: {
      loading: "Načítání",
      login: "Přihlásit se",
      register: "Zaregistrovat",
      authors: "Autoři",
      categories: "Kategorie",
      title: "Název",
      catalog: "Katalog",
      published_year: "Rok publikace",
      average_rating: "Průměrné hodnocení",
      num_pages: "Počet stránek",
      ratings_count: "Počet hodnocení",
      description: "Popis",
      username: "Uživatelské jméno",
      password: "Heslo",
      logout: "Odhlásit se",
      cancel: "Zrušit"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
