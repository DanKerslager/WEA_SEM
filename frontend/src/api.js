// src/api.js
import axios from 'axios';

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:8002`; // Dynamically use backend port
/**
 * Fetch filtered books data from the backend function.
 * @param {params} filterParams paramateres passed to be used for filtering search results
 * @returns filtered books
 */
export const fetchBooks = async (filterParams) => {
  const { isbn, authors, categories, title, page, limit, favorites, showHidden, showRated, userId } = filterParams;
  let link = `${BASE_URL}/getBooks?`;
  const encodedIsbn = encodeURIComponent(isbn);
  const encodedAuthors = encodeURIComponent(authors);
  const encodedCategories = encodeURIComponent(categories);
  const encodedTitle = encodeURIComponent(title);
  if (isbn !== '') link += `isbn=${encodedIsbn}&`;
  if (authors !== '') link += `author=${encodedAuthors}&`;
  if (categories !== '') link += `categories=${encodedCategories}&`;
  if (title !== '') link += `title=${encodedTitle}&`;
  if (favorites && favorites.length > 0) link += `favorites=${JSON.stringify(favorites)}&`;
  if (showHidden !== '') link += `showHidden=${JSON.stringify(showHidden)}&`;
  if (showRated) link += `showRated=${JSON.stringify(showRated)}&`;
  if (userId) link += `userId=${JSON.stringify(userId)}&`;

  link += `page=${page}&limit=${limit}&`;
  try {
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    throw new Error("Failed to load books data.", error);
  }
};
export const postRegister = async (userParams) =>{
  const { username, email, password } = userParams;
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password
    });
    // Vrátíme response data
    return response;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during register:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const getLogin = async (userParams) => {
  const { email, password } = userParams;
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    // Vrátíme response data
    return response;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during login:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const fetchBookDetail = async(bookParams) => {
  let { bookId } = bookParams;
  let link = `${BASE_URL}/getBooks/${bookId}`;
  try {
    const response = await axios.get(link);
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during book detail:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const createComment = async(userParams) => {
  const {bookId, text, username} = userParams;
  let link = `${BASE_URL}/getBooks/${bookId}/comments`;
  try{
    let user = username;
    const response = await axios.post(link, {
      bookId,
      text,
      user
    });
    //Vratíme response data
    return response;
  }
  catch (error){
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during comment post:", error);
    return error.response ? error.response.data : { message: 'Unknown Error' };
  }
};
export const setFavorite = async(userParams) => {

  const { userId, bookId, isFavorite } = userParams;
  let link = `${BASE_URL}/setFavorite/users/${userId}/favorites`;
  try {
    const response = await axios.patch(link, {
      bookId,
      isFavorite
    });
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during setting favourite:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};

export const rateBook = async(userParams) => {
  const { user, bookId, rating } = userParams;
  let link = `${BASE_URL}/getBooks/${bookId}/ratings`;
  try {
    const response = await axios.post(link, {
      user,
      rating
    });
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during rating book:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};

export const updatePersonalInfo = async(userParams) => {
  const { userId, firstName, lastName, gender, age, favoriteGenres, referenceSource } = userParams;
  let link = `${BASE_URL}/user/${userId}/personal-info`;
  try {
    const response = await axios.put(link, {
      firstName,
      lastName,
      gender,
      age,
      favoriteGenres,
      referenceSource
    });
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during updating user's personal info:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const updateAddressInfo = async(userParams) => {
  const { userId, personalAddress, billingAddress, sameAsPersonalAddress } = userParams;
  let link = `${BASE_URL}/user/${userId}/address`;
  try {
    const response = await axios.put(link, {
      personalAddress,
      billingAddress,
      sameAsPersonalAddress
    });
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during updating user's address:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const submitOrder = async(userParams) => {
  const { user, books, paymentMethod } = userParams;
  let link = `${BASE_URL}/createOrder`;
  try {
    const response = await axios.post(link, {
      user,
      books,
      paymentMethod
    });
    // Vrátíme response data
    return response;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during submitting order:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
