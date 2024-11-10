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
      cancel: "Cancel",
      comments: "Comments",
      comment: "Comment",
      loginToComment: "Please log in to comment",
      bookDetailUnavailable: "Book is currently unavailable",
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
      cancel: "Zrušit",
      comments: "Komentáře",
      comment: "Okomentovat",
      loginToComment: "Pro komentování se prosím přihlašte",
      bookDetailUnavailable: "Kniha není k dispozici",
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
