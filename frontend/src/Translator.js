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
      remove: 'Remove',
      add_to_favorites: 'Add to favorites',
      user_detail: 'User Detail',
      show_all_books: 'Show All Books',
      show_favorites_only: 'Show Favorites Only',
      show_availible: 'Show Availible',
      show_hidden: 'Show Hidden',
      show_rated_books_only: 'Show Rated Books Only',
      no_favorite_book: 'No book has been added to favorites yet',
      book_is: 'Book is ',
      available: 'Available',
      unavailable: 'Unavailable',
      price: 'Price',

      orders: "Orders",
      cart_add: "Add to cart",
      cart_remove: "Remove from cart",
      no_favorite_book: "No book has been added to favorites yet",
      street_required: "Street is required",
      city_required: "City is required",
      state_required: "State is required",
      ZIP_required: "ZIP code is required",
      country_required: "Country is required",
      first_name_required: "First name is required",
      last_name_required: "Last name is required",
      gender_required: "Gender is required",
      your_order: "Your order",
      email_address: "Email Address",
      email_required: "Email Address is required",
      payment_method: "Payment Method",
      payment_method_required: "Please choose a payment method",
      cash_on_delivery: "Cash on Delivery",
      cash_on_delivery_extra: "Flat extra",
      bank_transfer: "Bank Transfer",
      bank_transfer_extra: "No extra",
      card: "Card",
      card_extra: "Flat extra 1 % of book's price",
      consent_required: "Consent is required",
      place_order: "Place order",
      status: "Status",
      total: "Total",
      total_fees: "Total (fees included)",
      quantity: "Quantity",
      total_price: "Total price",
      no_items_yet: "No items were added yet",
      sub_total: "Sub-Total",
      items: "Items",
      checkout: "Checkout",
      something_went_wrong: "Oops, something went wrong :(",
      cart_contents: "Cart Contents",
      
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
      remove: 'Odstranit',
      add_to_favorites: 'Přidat do oblíbených',
      user_detail: 'Detail uživatele',
      show_all_books: 'Zobrazit všechny knihy',
      show_favorites_only: 'Zobrazit pouze oblíbené',
      show_availible: 'Zobrazit dostupné',
      show_hidden: 'Zobrazit skryté',
      show_rated_books_only: 'Zobrazit pouze hodnocené',
      no_favorite_book: 'Do oblíbených ještě nebyla přidána žádná kniha',
      book_is: 'Kniha je ',
      available: 'dostupná',
      unavailable: 'nedostupná',
      price: 'Cena',

      orders: "Objednávky",
      cart_add: "Přidat do košíku",
      cart_remove: "Odebrat z košíku",
      no_favorite_book: "Žádná kniha ještě nebyla přidána do oblíbených",
      street_required: "Ulice je poivnné pole",
      city_required: "Město je povinné pole",
      state_required: "Kraj je povinné pole",
      ZIP_required: "PSČ je povinné pole",
      country_required: "Stát je povinné pole",
      first_name_required: "Křestní jméno je povinné pole",
      last_name_required: "Příjmení je povinné pole",
      gender_required: "Pohlaví je povinné pole",
      your_order: "Vaše objednávka",
      email_address: "Emailová adresa",
      email_required: "Emailová adresa je povinné pole",
      payment_method: "Platební metoda",
      payment_method_required: "Prosím zvolte způsob platby",
      cash_on_delivery: "Dobírka",
      cash_on_delivery_extra: "Přirážka fixních",
      bank_transfer: "Bankovní převod",
      bank_transfer_extra: "Žádná přirážka",
      card: "Kartou",
      card_extra: "Fixní přirážka 1 % ceny knihy",
      consent_required: "Souhlas je povinné pole",
      place_order: "Objednat",
      status: "Stav",
      total: "Celkem",
      total_fees: "Celkem s poplatky",
      quantity: "Množství",
      total_price: "Cena celkem",
      no_items_yet: "Zatím nebyly přidány žádné položky",
      sub_total: "Celkem",
      items: "Položky",
      checkout: "K platbě",
      something_went_wrong: "Jejda, něco se nepovedlo :(",
      cart_contents: "Obsah košíku",

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
