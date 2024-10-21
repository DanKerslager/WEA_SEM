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
      register: "Registrovat se",
      authors: "Autoři",
      categories: "Kategorie",
      title: "Název",
      catalog: "Katalog",
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
