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
      personalAddress: "Personal Address",
      street: 'Street',
      city: 'City',
      state: 'State',
      zip_code: 'ZIP Code',
      billing_address: 'Billing Address',
      same_as_personal: 'Same as personal address',
      personal_information: 'Personal Information',
      first_name: 'First Name',
      last_name: 'Last Name',
      gender: 'Gender',
      select: 'Select',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      prefer_not_to_say: 'Prefer not to say',
      age: "Age",
      favorite_genres: "Favorite genres",
      fiction: 'Fiction',
      non_fiction: 'Non-Fiction',
      mystery: 'Mystery',
      where_did_you_find: 'Where did you find us?',
      consent: 'Consent',
      data_consent: 'I consent to data processing',
      save_changes: 'Save Changes',
      country: 'Country',
      required_field: 'This field is required',
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
      personalAddress: "Osobní Adresa",
      street: 'Ulice',
      city: 'Město',
      state: 'Kraj',
      zip_code: 'PSČ',
      billing_address: 'Fakturační Adresa',
      same_as_personal: 'Stejná jako osobní adresa',
      personal_information: 'Osobní Informace',
      first_name: 'Křestní jméno',
      last_name: 'Příjmení',
      gender: 'Pohlaví',
      select: 'Vyberte',
      male: 'Muž',
      female: 'Žena',
      other: 'Jiné',
      prefer_not_to_say: 'Nechci uvádět',
      age: "Věk",
      favorite_genres: "Oblíbené žánry",
      fiction: 'Fikce',
      non_fiction: 'Literatura faktu',
      mystery: 'Záhady',
      where_did_you_find: 'Kde jste na nás narazili?',
      consent: 'Souhlas',
      data_consent: 'Souhlasím se zpracováním dat',
      save_changes: 'Uložit změny',
      country: 'Země',
      required_field: 'Toto pole je povinné',
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
